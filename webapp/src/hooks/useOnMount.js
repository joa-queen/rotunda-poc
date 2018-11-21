import { useEffect } from 'react';

const useOnMount = mount => useEffect(mount, []);

export default useOnMount;
