const ProductBackGround = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="325"
      height="319"
      viewBox="0 0 325 319"
      fill="none"
    >
      <g filter="url(#filter0_d)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M68.0334 155.5L4 118.552L51.1963 36.948L115.267 73.8321L115.303 0H209.697L209.733 73.8321L273.803 36.948L321 118.552L256.966 155.5L321 192.448L273.803 274.052L209.733 237.168L209.697 311H115.303L115.267 237.168L51.1963 274.052L4 192.448L68.0334 155.5Z"
          fill="#95FF80"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="325"
          height="319"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default ProductBackGround;
