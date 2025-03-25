const ArrowIcon = ({ color = "#234014", width = 140, height = 70 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 140 70"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105 35L140 0V70L105 35ZM70 35L105 0V35V70L70 35ZM35 35L70 0V35V70L35 35ZM35 35V0L0 35L35 70V35Z"
        fill={color} // Make color dynamic
      />
    </svg>
  );
};

export default ArrowIcon;
