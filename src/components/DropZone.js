/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const defaultBaseStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '150px',
  backgroundColor: '#212327',
  padding: 24,
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#808080',
  borderStyle: 'dashed',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const defaultActiveStyle = {
  borderColor: '#2196f3',
};

const defaultAcceptStyle = {
  borderColor: '#EF843C',
};

const defaultRejectStyle = {
  borderColor: '#E24D42',
};

export function DropZone({
  children,
  baseStyle = {},
  activeStyle = {},
  acceptStyle = {},
  rejectStyle = {},
  ...rest
}) {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone(rest);

  const style = useMemo(
    () => ({
      ...defaultBaseStyle,
      ...baseStyle,
      ...(isDragActive ? { ...defaultActiveStyle, ...activeStyle } : {}),
      ...(isDragAccept ? { ...defaultAcceptStyle, ...acceptStyle } : {}),
      ...(isDragReject ? { ...defaultRejectStyle, ...rejectStyle } : {}),
    }),
    [isDragActive, isDragAccept, isDragReject, activeStyle, acceptStyle, rejectStyle, baseStyle]
  );

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
}
