export function Button(props) {
  console.log(props);
  return (
    <button
      className="bg-blue-600 text-white px-4 py-1 rounded-md my-4 mt-6 disabled:bg-indigo-300"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
