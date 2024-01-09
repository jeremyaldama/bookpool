export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-md block mt-4 mb-2 text-black">
      {children}
    </label>
  );
}
