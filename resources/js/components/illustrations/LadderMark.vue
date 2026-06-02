<template>
    <svg viewBox="0 0 32 32"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true">
        <!-- 四層遞增階梯／長條，對應四個階層級距 -->
        <rect x="3"
              y="22"
              width="5"
              height="7"
              rx="1.5"
              fill="#FB7185" />
        <rect x="11"
              y="17"
              width="5"
              height="12"
              rx="1.5"
              fill="#FBBF24" />
        <rect x="19"
              y="11"
              width="5"
              height="18"
              rx="1.5"
              fill="#24C2CE" />
        <rect x="27"
              y="4"
              width="5"
              height="25"
              rx="1.5"
              fill="#A78BFA"
              transform="translate(-1 0)" />
        <!-- 你在哪一層的定位點 -->
        <circle cx="13.5"
                cy="13"
                r="2.4"
                fill="#0C1120"
                stroke="#FBBF24"
                stroke-width="1.6" />
    </svg>
</template>

<script>
export default {
    name: 'LadderMark',
};
</script>
