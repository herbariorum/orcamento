
import { BOOTSTRAP_COLORS } from '@/variables/Collors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#d0d2d8',
    paddingTop: 62
  },
  headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4
  },
  titulo: {
    width: "100%",
    color: BOOTSTRAP_COLORS.light.text,
    fontWeight: 600,
    fontSize: 24,
    borderBottomColor: '#EEF0F5',
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  form: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 7,
    marginTop: 32,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 32,
    marginTop: 24,
  },
  header: {
    width: '100%',
    gap: 12,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EC',
    paddingBottom: 12,
  },
  clearButton: {
    marginLeft: 'auto',
  },
  clearButtonText: {
    fontSize: 12,
    color: '#828282',
    fontWeight: 600,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#EEF0F5',
    marginVertical: 16,
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 62,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EC',
  },
  listHeaderStatus: {
    width: 24,
  },
  listHeaderDescription: {
    flex: 1,
    minWidth: 0,
    fontSize: 12,
    fontWeight: 600,
    color: '#828282',
  },
  listHeaderQuantity: {
    width: 72,
    fontSize: 12,
    fontWeight: 600,
    color: '#828282',
    textAlign: 'center',
  },
  listHeaderAction: {
    width: 24,
  },
  emptyListText: {
    fontSize: 14,
    color: '#808080',
    textAlign: 'center',
  },

  rodape: {
    gap: 8,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E4E6EC',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    color: '#555',
  },
  total: {
    fontSize: 18,
    color: '#000',
    fontWeight: 600,
  },
  valor: {
    fontWeight: 400,
    color: 'rgb(9, 118, 46)',
  },
  totalRow: {
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E4E6EC',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 600,
  },
  pricingWarning: {
    fontSize: 12,
    color: '#b42318',
  },
});