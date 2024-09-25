import React, { useState } from 'react';

function TextSigno({ initialValue }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      rows="4"
      cols="50"
    />
  );
}

export default TextSigno;