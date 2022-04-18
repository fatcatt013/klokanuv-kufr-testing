{
  outputs = { self, nixpkgs }: let
    inherit (pkgs.nix-gitignore) gitignoreSourcePure;
    pkgs = import nixpkgs {
      system = "x86_64-linux";
      overlays = [ self.overlay ];
    };
    src = gitignoreSourcePure [./.gitignore] ./server;
    poetryPython = pkgs.poetry2nix.mkPoetryPackages {
      projectDir = src;
      overrides = pkgs.poetry2nix.overrides.withDefaults (
        self: super: {
          uwsgi = {};
        }
      );
    };
    inherit (poetryPython) poetryPackages pyProject;

    klokan-env = poetryPython.python.buildEnv.override {
      extraLibs = poetryPackages;
    };

    uwsgi-python = (pkgs.uwsgi.override { plugins = [ "python3" ]; python3 = pkgs.python3; }).overrideAttrs (old: { buildInputs = old.buildInputs ++ [ pkgs.zlib pkgs.expat ]; });

    # Wrapper script that sets the right options for uWSGI
    klokan-uwsgi = pkgs.writeScriptBin "klokan-uwsgi" ''
      #! ${pkgs.runtimeShell}
      MANAGE_PY=1 ${klokan-env}/bin/python ${klokan}/manage.py migrate

      ${uwsgi-python}/bin/uwsgi "$@" \
        --plugins python3 \
        --socket-timeout 1800 \
        --threads 5 \
        --processes 5 \
        --pythonpath ${klokan-env}/${klokan-env.sitePackages} \
        --pythonpath ${klokan} \
        --module klokan.wsgi:application \
        --log-master \
        --harakiri 1800 \
        --max-requests 5000 \
        --vacuum \
        --limit-post 0 \
        --post-buffering 16384 \
        --thunder-lock \
        --ignore-sigpipe \
        --ignore-write-errors \
        --disable-write-exception
    '';

    klokan = pkgs.stdenv.mkDerivation {
      pname = moduleName pyProject.tool.poetry.name;
      version = pyProject.tool.poetry.version;
      inherit src;

      buildInputs = [ klokan-env ];

      # Build all static files beforehand
      buildPhase = ''
        export STATIC_ROOT=static
        export DJANGO_ENV=production
        MANAGE_PY=1 python manage.py collectstatic
        # MANAGE_PY=1 python manage.py compress
      '';
      installPhase = ''
        mkdir $out
        cp -r klokan record_sheet manage.py $out/
        cp -r static $out/static
      '';
    };

    moduleName = name: pkgs.lib.toLower (pkgs.lib.replaceStrings [ "_" "." ] [ "-" "-" ] name);

    klokan-package = pkgs.buildEnv {
      name = moduleName pyProject.tool.poetry.name + "-" + pyProject.tool.poetry.version;
      paths = [
        klokan-env
        uwsgi-python
        klokan
        klokan-uwsgi
        pkgs.file
      ];
    };
  in {
    overlay = final: prev: {
      klokan = klokan-package;
    };
    packages.x86_64-linux = {
      klokan = klokan-package;
    };
    defaultPackage.x86_64-linux = klokan-package;

    nixosModule = { config, lib, pkgs, ... }: let
      pkgName = "klokan";
      cfg = config.services.${pkgName};
    in {
      options.services.${pkgName} = {
        enable = lib.mkEnableOption "${pkgName}";
        domain = lib.mkOption {
          type = lib.types.str;
          description = "${pkgName} Nginx vhost domain";
        };
        port = lib.mkOption {
          type = lib.types.int;
          description = "${pkgName} internal port";
        };
        stateDir = lib.mkOption {
          type = lib.types.str;
        };
      };
      config = lib.mkIf cfg.enable {
        users.extraUsers.klokan = {
          isNormalUser = true;
          home = cfg.stateDir;
        };

        services.nginx = {
          virtualHosts.${cfg.domain} = {
            enableACME = true;
            forceSSL = true;
            locations."/" = {
              proxyPass = "http://127.0.0.1:${toString cfg.port}";
            };
          };
        };

        systemd.services.klokan = {
          description = "Klokan Webserver";
          wantedBy = [ "multi-user.target" ];
          after = [ "network-online.target" ];
          environment.DATABASE_URL = "db.sqlite3";
          serviceConfig = {
            User = "klokan";
            Restart = "always";
            WorkingDirectory = cfg.stateDir;
            ExecStart = pkgs.writeShellScript "klokan-start" ''
              set -euo pipefail
              exec ${pkgs.klokan}/bin/klokan-uwsgi --http-socket 127.0.0.1:${toString cfg.port}
            '';
          };
        };
      };
    };
  };
}
