import { useEffect } from 'react';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { useSettingsStore } from '../store/useSettingsStore';

export function useKeepAwake() {
  const { keepAwake } = useSettingsStore();

  useEffect(() => {
    if (keepAwake) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }

    return () => {
      deactivateKeepAwake();
    };
  }, [keepAwake]);
}
