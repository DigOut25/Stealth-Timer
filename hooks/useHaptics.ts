import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '@/store';

export function useHaptics() {
  const { hapticsEnabled } = useSettingsStore();

  const impact = async (
    style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Medium
  ) => {
    if (!hapticsEnabled) return;
    await Haptics.impactAsync(style);
  };

  const notification = async (
    type: Haptics.NotificationFeedbackType = Haptics.NotificationFeedbackType.Success
  ) => {
    if (!hapticsEnabled) return;
    await Haptics.notificationAsync(type);
  };

  const selection = async () => {
    if (!hapticsEnabled) return;
    await Haptics.selectionAsync();
  };

  return { impact, notification, selection };
}
