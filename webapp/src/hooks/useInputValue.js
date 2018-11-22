import { useState, useCallback } from 'react';

function useInputValue(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return [
    {
      value,
      onChange,
    },
    setValue,
  ];
}

export default useInputValue;
