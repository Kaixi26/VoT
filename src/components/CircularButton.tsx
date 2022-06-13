
export default function CircularButton({ children, className, ...rest }: { children: any, [key: string]: any }) {
  return (
    <button className={`hover:cursor-pointer rounded-xl hover:bg-black hover:bg-opacity-25 ease-in-out duration-150 inline p-3 ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}