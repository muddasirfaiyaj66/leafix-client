import { ReactNode } from 'react';

type TContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: TContainerProps) => {
  return <div className=" max-w-screen-xl mx-auto px-5 font-primary">{children}</div>;
};

export default Container;