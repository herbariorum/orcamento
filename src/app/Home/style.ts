
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
  emptyListText: {
    fontSize: 14,
    color: '#808080',
    textAlign: 'center',
  },


});