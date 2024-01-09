export function Card({ children }) {
  console.log({children})
  return <div className="bg-yellow-100 max-w-md w-full p-10 rounded-md">{children}</div>;
}
