<script setup>
const props = defineProps(['rating', 'animated', 'id'])
const percentage = computed(() => props.rating / 5);
</script>

<template>
  <svg viewBox="0 0 500 100"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
       :class="{ 'animated': animated }">
    <title>{{ rating }} out of 5</title>
    <defs>
      <mask :id="`star-mask-${id}`">
        <path d="M50 0H0V100H500V0H450H350H250H150H50ZM50 0L38.7743 34.5491H2.44717L31.8364 55.9017L20.6107 90.4509L50 69.0983L79.3893 90.4509L68.1636 55.9017L97.5528 34.5491H61.2257L50 0ZM150 0L138.774 34.5491H102.447L131.836 55.9017L120.611 90.4509L150 69.0983L179.389 90.4509L168.164 55.9017L197.553 34.5491H161.226L150 0ZM250 0L238.774 34.5491H202.447L231.836 55.9017L220.611 90.4509L250 69.0983L279.389 90.4509L268.164 55.9017L297.553 34.5491H261.226L250 0ZM350 0L338.774 34.5491H302.447L331.836 55.9017L320.611 90.4509L350 69.0983L379.389 90.4509L368.164 55.9017L397.553 34.5491H361.226L350 0ZM450 0L438.774 34.5491H402.447L431.836 55.9017L420.611 90.4509L450 69.0983L479.389 90.4509L468.164 55.9017L497.553 34.5491H461.226L450 0Z"
              fill="black" />
        <path d="M50 0L61.2257 34.5491H97.5528L68.1636 55.9017L79.3893 90.4509L50 69.0983L20.6107 90.4509L31.8364 55.9017L2.44717 34.5491H38.7743L50 0ZM450 0L461.226 34.5491H497.553L468.164 55.9017L479.389 90.4509L450 69.0983L420.611 90.4509L431.836 55.9017L402.447 34.5491H438.774L450 0ZM361.226 34.5491L350 0L338.774 34.5491H302.447L331.836 55.9017L320.611 90.4509L350 69.0983L379.389 90.4509L368.164 55.9017L397.553 34.5491H361.226ZM250 0L261.226 34.5491H297.553L268.164 55.9017L279.389 90.4509L250 69.0983L220.611 90.4509L231.836 55.9017L202.447 34.5491H238.774L250 0ZM161.226 34.5491L150 0L138.774 34.5491H102.447L131.836 55.9017L120.611 90.4509L150 69.0983L179.389 90.4509L168.164 55.9017L197.553 34.5491H161.226Z"
              fill="white" />
      </mask>
    </defs>
    <g :mask="`url(#star-mask-${id})`" fill="var(--primary-color)">
      <rect 
            width="500"
            height="100"
            fill="var(--dark-color)" />
      <rect :id="`bar-${id}`"
            :style="`--star-percent: ${percentage}`"
            width="500"
            height="100"
            fill="var(--accent-color)" />
    </g>
  </svg>
</template>

<style>
:root {
  --star-rating-height: 15ch;
  --star-percent: 0;
}

svg {
  width: var(--star-rating-height);
  height: auto;
  margin: 0;
}

[id^=bar] {
  transform: scaleX(var(--star-percent));

}

.animated [id^=bar] {
  transform: scaleX(0);
  -webkit-animation: starScale 2s ease forwards;
  animation: starScale 2s ease forwards;
}

@-webkit-keyframes starScale {
  to {
    transform: scaleX(var(--star-percent));
  }
}

@keyframes starScale {
  to {
    transform: scaleX(var(--star-percent));
  }
}
</style>