function LoadingElement() {
  return (
    <div
      className="absolute inset-0 bg-gray-800 opacity-80"
      style={{ zIndex: 1 }}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <div className="h-28 w-28 animate-spin rounded-full border-t-2 border-t-primary opacity-75" />
      </div>
    </div>
  );
}

export default LoadingElement;
