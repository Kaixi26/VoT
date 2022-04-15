
export default function CircularButton({ children, ...rest }: { children: any, [key: string]: any }) {
  return (
    <div className="hover:cursor-pointer scale-[2] rounded-xl hover:bg-black hover:bg-opacity-25 ease-in-out duration-150"
      {...rest}
    >
      {children}
    </div>
  );
}