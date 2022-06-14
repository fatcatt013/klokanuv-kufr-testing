import React from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, LayoutAnimation } from 'react-native';
import { MultiFABProps } from './MultiFAB';

const MultiFABContext = React.createContext<{
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  showButton: boolean;
  props: MultiFABProps;
  setStatus: (status: MultiFABProps) => void;
} | null>(null);

export const MultiFABProvider: React.FC = React.memo(function MultiFABProvider({ children }) {
  const [showButton, setShowButton] = React.useState(true);
  const [props, setProps] = React.useState<MultiFABProps>({})

  const scrollOffset = React.useRef(0);

  const handleScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const CustomLayoutLinear = {
        duration: 100,
        create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
        update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
        delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      };
      // Check if the user is scrolling up or down by confronting the new scroll position with your own one
      const currentOffset = event.nativeEvent.contentOffset.y;
      const direction = currentOffset > 0 && currentOffset > scrollOffset.current ? 'down' : 'up';
      // If the user is scrolling down (and the action-button is still visible) hide it
      const isActionButtonVisible = direction === 'up';
      if (isActionButtonVisible !== showButton) {
        LayoutAnimation.configureNext(CustomLayoutLinear);
        setShowButton(isActionButtonVisible);
      }
      // Update your scroll position
      scrollOffset.current = currentOffset;
    },
    [showButton]
  );

  const setStatus = React.useCallback((props: MultiFABProps) => {
    setProps(props);
  }, []);

  const context = { handleScroll, showButton, props, setStatus };
  return <MultiFABContext.Provider value={context}>{children}</MultiFABContext.Provider>;
});

export const useMultiFABScroll = () => {
  const context = React.useContext(MultiFABContext);
  if (context === null) {
    throw new Error("You cannot use `useMultiFABScroll` outside of a MultiFABContext");
  }
  return context;
};
