import React from 'react';
import { QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Text } from 'react-native';
import { Button } from './Button';
import { Background } from './Background';

export const QueryBoundary: React.FC = ({ children }) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <Background center>
            <Text>Nastala chyba!</Text>
            <Button mode='contained' onPress={() => resetErrorBoundary()}>Zkusit znovu</Button>
          </Background>
        )}
      >
        {children}
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);
