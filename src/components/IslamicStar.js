// 'use client'

// /**
//  * Eight-pointed Islamic star (Rub el Hizb) with geometric precision
//  * Created by overlapping two squares rotated 45 degrees
//  */
// const IslamicStar = ({ className = '', size = 120 }) => {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox='0 0 200 200'
//       fill='none'
//       xmlns='http://www.w3.org/2000/svg'
//       className={className}
//     >
//       <g className='star-group'>
//         {/* First square (straight) - creates 4 points */}
//         <path
//           d='M100 15 L135 100 L100 185 L65 100 Z'
//           fill='currentColor'
//           className='star-square-1'
//           opacity='0.9'
//         />
        
//         {/* Second square (rotated 45°) - creates other 4 points */}
//         <path
//           d='M15 100 L100 135 L185 100 L100 65 Z'
//           fill='currentColor'
//           className='star-square-2'
//           opacity='0.9'
//         />
        
//         {/* Inner octagon for depth */}
//         <path
//           d='M100 55 L125 75 L145 100 L125 125 L100 145 L75 125 L55 100 L75 75 Z'
//           fill='currentColor'
//           opacity='0.7'
//         />
        
//         {/* Center circle */}
//         <circle
//           cx='100'
//           cy='100'
//           r='30'
//           fill='currentColor'
//           opacity='0.85'
//         />
        
//         {/* Inner decorative circle */}
//         <circle
//           cx='100'
//           cy='100'
//           r='20'
//           fill='none'
//           stroke='currentColor'
//           strokeWidth='2'
//           opacity='0.5'
//         />
        
//         {/* Innermost circle */}
//         <circle
//           cx='100'
//           cy='100'
//           r='12'
//           fill='currentColor'
//           opacity='0.6'
//         />
//       </g>
//     </svg>
//   )
// }

// export default IslamicStar

'use client'

const IslamicStar = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g fill="currentColor" className="animate-spin-reverse origin-center" style={{ transformOrigin: '100px 100px' }}>
        {/* Square 1 (axis-aligned) */}
        <rect x="40" y="40" width="120" height="120" opacity="0.9" />

        {/* Square 2 (same square rotated 45deg around center) */}
        <rect
          x="40"
          y="40"
          width="120"
          height="120"
          transform="rotate(45 100 100)"
          opacity="0.9"
        />

        {/* Optional inner detail (smaller rotated square) */}
        <rect
          x="70"
          y="70"
          width="60"
          height="60"
          transform="rotate(45 100 100)"
          opacity="0.25"
        />

        {/* Center circle */}
        <circle cx="100" cy="100" r="18" opacity="0.5" />
        <circle cx="100" cy="100" r="10" opacity="0.35" />
      </g>
    </svg>
  )
}

export default IslamicStar
