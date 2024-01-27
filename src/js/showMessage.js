import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Show custom pop up with message and specific color
export default function showMessage(message, color) {
  return iziToast.show({
    message: `${message}`,
    color: `${color}`,
    position: 'topRight',
    transitionIn: 'fadeInDown',
  });
}
