import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { TEST_IDS } from '../../utils/testIds';
import type { FilterStatus } from '../../hooks/useLaunches';

interface FilterModalProps {
  visible: boolean;
  current: FilterStatus;
  onSelect: (status: FilterStatus) => void;
  onClose: () => void;
}

const OPTIONS: { value: FilterStatus; label: string; testID: string }[] = [
  { value: 'all', label: 'Todos', testID: TEST_IDS.LAUNCH_FILTER_STATUS_ALL },
  { value: 'success', label: 'Sucesso', testID: TEST_IDS.LAUNCH_FILTER_STATUS_SUCCESS },
  { value: 'failure', label: 'Falha', testID: TEST_IDS.LAUNCH_FILTER_STATUS_FAILURE },
  { value: 'upcoming', label: 'Programados', testID: TEST_IDS.LAUNCH_FILTER_STATUS_UPCOMING },
];

export function FilterModal({ visible, current, onSelect, onClose }: FilterModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View
          testID={TEST_IDS.LAUNCH_FILTER_MODAL}
          accessibilityLabel={TEST_IDS.LAUNCH_FILTER_MODAL}
          style={styles.sheet}
        >
          <Text style={styles.title}>Filtrar por status</Text>

          {OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              testID={opt.testID}
              accessibilityLabel={opt.testID}
              style={[styles.option, current === opt.value && styles.optionSelected]}
              onPress={() => onSelect(opt.value)}
            >
              <Text style={[styles.optionText, current === opt.value && styles.optionTextSelected]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.actions}>
            <TouchableOpacity
              testID={TEST_IDS.LAUNCH_FILTER_CLEAR}
              accessibilityLabel={TEST_IDS.LAUNCH_FILTER_CLEAR}
              style={styles.clearButton}
              onPress={() => { onSelect('all'); onClose(); }}
            >
              <Text style={styles.clearText}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={TEST_IDS.LAUNCH_FILTER_APPLY}
              accessibilityLabel={TEST_IDS.LAUNCH_FILTER_APPLY}
              style={styles.applyButton}
              onPress={onClose}
            >
              <Text style={styles.applyText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surfaceElevated,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  option: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xs,
  },
  optionSelected: {
    backgroundColor: colors.accent,
  },
  optionText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  optionTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  clearButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  clearText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
  },
  applyText: {
    color: colors.white,
    fontWeight: '600',
  },
});
