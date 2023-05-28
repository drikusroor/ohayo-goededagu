const Skeleton = ({ className = '' }) => {
  const skeletonClasses = `bg-gray-200 animate-pulse ${className}`;

  return (
    <div role="status" className={skeletonClasses} />
  );
};

export default Skeleton
