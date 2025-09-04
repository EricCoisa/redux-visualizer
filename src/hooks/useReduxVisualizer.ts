import { useSelector } from 'react-redux';

export const useReduxState = () => {
  const state = useSelector((state) => state);
  return state;
};
