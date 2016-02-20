import pageActions from './pageActions';
export default function addPageAction(type, transformer) {
  pageActions[type] = transformer;
};