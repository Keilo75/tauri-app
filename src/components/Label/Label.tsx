import { Text, TextProps } from '@mantine/core';
import React from 'react';

const Label: React.FC<TextProps<'div'>> = (props) => {
  return (
    <Text {...props} size="sm" weight={500}>
      {props.children}
    </Text>
  );
};

export default Label;
