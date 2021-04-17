import { isIOS, isChrome } from 'react-device-detect';
import { useSetRecoilState } from 'recoil';
import { errorState } from '../error/recoil';
import { useCameraState } from './reducer';
import { getUserDevices, getUserCamera } from './webrtc';

export const useCamera = () => {
  const setError = useSetRecoilState(errorState);
  const { setVideoTrack, releaseVideo } = useCameraState();

  const enableUserVideo = async () => {
    if (isIOS && isChrome) {
      console.error('maybe iPhone user');
    }

    const { videoInDevices } = await getUserDevices({ video: true }).catch((err: Error) => {
      throw setError({ isError: true, errorMessage: err.message });
    });

    // must not be happend
    if (videoInDevices === null) {
      throw setError({ isError: true, errorMessage: 'Does not exist videoInDevices' });
    }

    if (videoInDevices.length === 0) {
      throw setError({ isError: true, errorMessage: 'At least 1 device needs' });
    }

    const [{ deviceId }] = videoInDevices;
    const videoTrack = await getUserCamera(deviceId).catch((err) => {
      throw setError({ isError: true, errorMessage: err.message });
    });
    releaseVideo();
    setVideoTrack(videoTrack, 'camera', deviceId);

    // const devices = await getUserDevices({ video: true }).catch((err) => {
    //   throw setError({ isError: true, errorMessage: err.message });
    // });
    // dispatch(setVideoDevices(devices));
  };

  return { enableUserVideo };
};
