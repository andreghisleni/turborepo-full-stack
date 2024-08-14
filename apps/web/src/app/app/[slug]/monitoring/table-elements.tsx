export function Table(props: any) {
  return <table {...props} className="w-full border-collapse" />;
}
export function Thead(props: any) {
  return <thead {...props} className="" />;
}
export function Th(props: any) {
  return <th {...props} className="border-b border-black px-4 py-2" />;
}
export function Tr(props: any) {
  return (
    <tr
      {...props}
      className="data-[status=Activated]:bg-red-400 data-[status=Normal]:bg-green-400 data-[status=Offline]:bg-blue-400"
    />
  );
}
export function Tbody(props: any) {
  return <tbody {...props} className="" />;
}
export function Td(props: any) {
  return <td {...props} className="border-b border-black px-4 py-2" />;
}
