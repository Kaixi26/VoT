
export default function CircularButton({ children, className, ...rest }: { children: any, [key: string]: any }) {
  return (
    <div className={`hover:cursor-pointer rounded-xl hover:bg-black hover:bg-opacity-25 ease-in-out duration-150 ${className ?? ""} inline p-3`}
      {...rest}
    >
      {children}
    </div>
  );
}