import { ReactNode } from 'react';

type TContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: TContainerProps) => {
  return <div className="h-screen w-full max-w-screen-7xl mx-auto px-5">{children}</div>;
};

export default Container;