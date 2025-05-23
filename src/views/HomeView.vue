<template>
  <!-- Navigation bar start -->
  <div class="navbar bg-base-100 container">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a>Cryptocurrency</a></li>
          <li><a>Exchanges</a></li>
          <li><a>Watchlist</a></li>
          <li><a>NFT</a></li>
          <li><a>Portfolio</a></li>
        </ul>
      </div>

      <a class="btn btn-ghost text-xl">Logo</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a>Cryptocurrency</a></li>
        <li><a>Exchanges</a></li>
        <li><a>Watchlist</a></li>
        <li><a>NFT</a></li>
        <li><a>Portfolio</a></li>
        <li><a>Products</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <button
        @click="toggleLoginModal"
        class="btn max-w-full px-8 py-4 bg-gradient-to-r from-[#468ef9] to-[#0c66ee] border border-[#0c66ee] text-white"
      >
        Login
      </button>
    </div>
  </div>
  <!-- Navigation end -->

  <!-- Hero section start -->
  <div class="relative max-w-screen-xl mx-auto grid grid-cols-12 gap-x-6 overflow-hidden">
    <div
      class="col-span-12 lg:col-span-6 mt-12 xl:mt-10 space-y-4 sm:space-y-6 px-6 text-center sm:text-left"
    >
      <span
        data-aos="fade-right"
        data-aos-once="true"
        class="text-base text-gradient font-semibold uppercase"
        >Sign Up Today</span
      >
      <h1
        data-aos="fade-right"
        data-aos-once="true"
        class="text-[2.5rem] sm:text-5xl xl:text-6xl font-bold leading-tight capitalize sm:pr-8 xl:pr-10"
      >
        The World's <span class="text-header-gradient">Fastest Growing</span> Crypto Web App
      </h1>
      <p
        data-aos="fade-down"
        data-aos-once="true"
        data-aos-delay="300"
        class="paragraph hidden sm:block"
      >
        Buy and sell 200+ cryptocurrencies with 20+ flat currencies using bank transfers or your
        credit/debit card.
      </p>
      <div
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-delay="700"
        class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-2"
      >
        <button
          @click="toggleModal"
          class="btn max-w-full px-8 py-4 bg-gradient-to-r from-[#468ef9] to-[#0c66ee] border border-[#0c66ee] text-white"
        >
          Get Started
        </button>
        <button
          @click="toggleLoginModal"
          class="btn max-w-full px-8 py-4 bg-gradient-to-r from-[#468ef9] to-[#0c66ee] border border-[#0c66ee] text-white"
        >
          Login
        </button>

        <!-- <button
          class="btn max-w-full px-6 py-4 bg-gradient-to-r from-[#468ef9] to-[#0c66ee] text-gradient border border-[#0c66ee] flex items-center justify-center"
        >
          <span>Download App</span>
        </button> -->
      </div>
    </div>
    <div class="hidden sm:block col-span-12 lg:col-span-6">
      <div class="w-full">
        <img
          data-aos="fade-up"
          data-aos-once="true"
          src="../assets/img/hero-image.webp"
          class="-mt-4"
          alt=""
        />
      </div>
    </div>
    <img
      data-aos="fade-up"
      data-aos-delay="300"
      src="../assets/patterns/ellipse-1.png"
      class="hidden sm:block absolute bottom-12 xl:bottom-16 left-4 xl:left-0 w-6"
    />
    <img
      data-aos="fade-up"
      data-aos-delay="300"
      src="../assets/patterns/ellipse-2.png"
      class="hidden sm:block absolute top-4 sm:top-10 right-64 sm:right-96 xl:right-[32rem] w-6"
    />
    <img
      data-aos="fade-up"
      data-aos-delay="300"
      src="../assets/patterns/ellipse-2.png"
      class="hidden sm:block absolute bottom-56 right-24 w-6"
    />
    <img
      data-aos="fade-up"
      data-aos-delay="300"
      src="../assets/patterns/star.png"
      class="hidden sm:block absolute top-20 sm:top-28 right-16 lg:right-0 lg:left-[30rem] w-8"
    />
  </div>
  <!-- Hero section end -->

  <!-- Crypto statistics start -->
  <section
    class="max-w-screen-xl mx-2 sm:mx-auto px-4 sm:px-6 lg:px-0 py-6 pb-20 sm:py-8 rounded-[2.25rem] sm:rounded-xl bg-white shadow-lg sm:shadow-md transform lg:-translate-y-12"
  >
    <div class="w-full flex flex-col lg:flex-row items-center justify-center">
      <CryptoStatistic
        title="🔥 Trending"
        :datasets="trendings"
        class="xl:border-r border-gray-200 lg:px-8"
      />
      <CryptoStatistic
        data-aos-delay="150"
        title="🚀 Top Gainers"
        :datasets="topGainers"
        class="xl:border-r border-gray-200 lg:px-8"
      />
      <CryptoStatistic title="💎 Recently Added" :datasets="recents" class="lg:px-8" />
    </div>
  </section>
  <!-- Crypto statistics end -->

  <!-- Buy and trade section start -->
  <section class="w-full my-24">
    <BaseSection>
      <BuyTradeImage class="sm:hidden mb-8" />
      <div data-aos="fade-right" class="col-span-12 lg:col-span-6 mt-4 xl:mt-20 space-y-6 px-4">
        <h2 class="text-4xl font-semibold sm:pr-8 xl:pr-12">
          Buy & trade on the <br class="hidden sm:block" />
          original crypto exchange.
        </h2>
        <p class="paragraph">
          Buy now and get 40% extra bonus Minimum pre-sale amount 25 Crypto Coin. We accept BTC
          crypto-currency
        </p>
        <div class="space-y-6 lg:pr-12">
          <LandingExchange
            title="Amount"
            name="amount"
            type="number"
            default-value="5.000"
            :exchange-selected="currencySelected"
            :exchanges="currencies"
          />
          <LandingExchange
            title="Get"
            name="get"
            type="number"
            default-value="0.10901"
            :exchange-selected="cryptoSelected"
            :exchanges="cryptocurrencies"
          />
          <button
            class="btn w-full px-8 py-4 bg-gradient-to-r from-[#468ef9] to-[#0c66ee] border border-[#0c66ee] text-white rounded-full hover:shadow-md hover:shadow-[#0c66ee]/50 transition duration-300"
          >
            Buy Now
          </button>
        </div>
      </div>
      <BuyTradeImage data-aos="fade-left" class="hidden sm:block" />
    </BaseSection>
  </section>
  <!-- Buy and trade section end -->

  <!-- Partners section start-->
  <section class="bg-partner relative max-w-full sm:mx-6 my-24 shadow sm:rounded-2xl">
    <div
      class="w-full px-6 sm:px-0 py-16 flex flex-col items-center justify-center space-y-4 text-center"
    >
      <h3 data-aos="flip-down" class="text-2xl text-neutral-800 font-semibold">
        Trusted Partners Worldwide
      </h3>
      <p data-aos="flip-down" class="paragraph">
        We're partners with countless major organisations around the globe
      </p>
      <div data-aos="fade-up" class="flex flex-wrap items-center justify-center">
        <PartnerImage v-for="(img, index) in partnerImages" :key="index" :img="img" />
      </div>
    </div>
  </section>
  <!-- Partners section end -->

  <!-- Credit card section start -->
  <section class="w-full my-36">
    <BaseSection data-aos="fade-down">
      <div class="col-span-12 lg:col-span-7">
        <div class="w-full">
          <img src="../assets/img/nefa-cc.webp" alt="" class="w-[95%]" />
          <!-- <img src="require('~/assets/img/nefa-cc.webp')" class="w-[95%]" alt="" /> -->
        </div>
      </div>
      <div class="col-span-12 lg:col-span-5 space-y-6 px-4 sm:px-6 mt-20">
        <h2 class="text-4xl font-semibold">
          Introducing the <span class="text-header-gradient">NEFA</span> Credit Card
        </h2>
        <p class="paragraph">
          Subject to cardholder and rewards terms which will be available at application.
        </p>
        <ul class="space-y-4 sm:space-y-2">
          <ListItem title="Up to 3% back on purchases" />
          <ListItem title="Earn rewards in bitcoin or any crypto on NEFA" />
          <ListItem title="No annual fee" />
        </ul>

        <button
          class="btn w-full px-8 py-4 bg-gradient-to-r from-[#468ef9] to-[#0c66ee] border border-[#0c66ee] text-white rounded-full hover:shadow-md hover:shadow-[#0c66ee]/50 transition duration-300"
        >
          Join the waitlist
        </button>
      </div>
    </BaseSection>
  </section>
  <!-- Credit card section end -->

  <!-- Advanced tranding tools section start -->
  <section
    class="bg-trading-tools relative max-w-full sm:mx-4 my-20 py-16 shadow rounded-2xl overflow-hidden"
  >
    <div class="relative max-w-screen-xl px-4 sm:px-2 mx-auto grid grid-cols-12 gap-x-6">
      <TradingToolImage class="sm:hidden" />
      <div
        data-aos="fade-right"
        class="col-span-12 lg:col-span-6 space-y-8 sm:space-y-6 px-4 sm:px-6 mt-8"
      >
        <h2 class="text-4xl font-semibold">
          Advanced Trading <span class="text-header-gradient">Tools</span>
        </h2>
        <div class="space-y-2">
          <h4 class="text-lg font-medium">Professional Access, Non-stop Availability</h4>
          <p class="paragraph text-sm xl:text-base">
            We provide premium access to crypto trading for both individuals and institutions
            through high liquidity, reliable order execution and constant uptime.
          </p>
        </div>
        <div class="space-y-2">
          <h4 class="text-lg font-medium">A Range of Powerful Apis</h4>
          <p class="paragraph text-sm xl:text-base">
            Set up your own trading interface or deploy your algorithmic strategy with our
            high-performance FIX and HTTP APIs. Connect to our WebSocket for real-time data
            streaming.
          </p>
        </div>
        <div class="space-y-2">
          <h4 class="text-lg font-medium">Customer Support</h4>
          <p class="paragraph text-sm xl:text-base">
            Premium 24/7 support available to all customers worldwide by phone or email. Dedicated
            account managers for partners.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row">
          <BaseButton class="px-10 py-4 bg-inherit text-gradient border border-[#4A8FF6] text-base">
            Get Started
          </BaseButton>
          <BaseButton
            class="bg-inherit text-[#4A8FF6] px-10 py-4 text-center underline rounded-full"
          >
            Learn More
          </BaseButton>
        </div>
      </div>
      <TradingToolImage data-aos="fade-left" class="hidden sm:block" />
    </div>
  </section>
  <!-- Advanced tranding tools section end -->

  <!-- Industry-leading security section start -->
  <section class="w-full my-24">
    <div class="relative max-w-screen-xl px-8 mx-auto grid grid-cols-12 gap-x-6">
      <div data-aos="fade-right" class="col-span-12 lg:col-span-6">
        <div class="w-full">
          <img src="../assets/img/industry-leading-security.webp" class="w-full" alt="" />
        </div>
      </div>
      <div
        data-aos="fade-left"
        class="col-span-12 lg:col-span-5 space-y-8 sm:space-y-6 mt-8 xl:px-8"
      >
        <h2 class="text-4xl font-semibold">Industry-leading security from day one</h2>
        <ul class="space-y-8 sm:space-y-4">
          <ListItem title="Safety, security and compliance">
            <p class="text-sm text-gray-700 leading-relaxed">
              NEFA is a licensed New York trust company that undergoes regular bank exams and is
              subject to the cybersecurity audits conducted by the New York Department of Financial
              Services.
              <span class="underline">Learn more</span> about our commitment to security.
            </p>
          </ListItem>
          <ListItem title="Hardware security keys">
            <p class="text-sm text-gray-700 leading-relaxed">
              With NEFA you can secure your account with a hardware security key via WebAuthn.
            </p>
          </ListItem>
          <ListItem title="SOC Certifications">
            <p class="text-sm text-gray-700 leading-relaxed">
              NEFA is <span class="underline">SOC 1 Type 2</span> and
              <span class="underline">SOC 2 Type 2</span> compliant. We are the world’s first
              cryptocurrency exchange and custodian to complete these exams.
            </p>
          </ListItem>
        </ul>
      </div>
    </div>
  </section>
  <!-- Industry-leading security section end-->

  <!-- Getting started section start-->
  <section
    class="bg-trading-tools relative max-w-full sm:mx-4 xl:mx-10 my-24 shadow sm:rounded-2xl overflow-hidden"
  >
    <div class="w-full py-16 flex flex-col items-center">
      <h2 data-aos="flip-down" class="text-3xl sm:text-4xl font-semibold text-center">
        Get started in just a few minutes
      </h2>
      <div
        data-aos="fade-up"
        class="relative w-full flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 px-4 xl:px-10 mt-16 sm:mt-8"
      >
        <LandingStep v-for="step in steps" :key="step.title" :step="step" />
        <img
          src="../assets/img/getting-started/arrow.png"
          class="hidden lg:inline-block absolute top-32 left-64 xl:left-[22rem] w-24 xl:w-[9.5rem]"
          alt=""
        />
        <img
          src="../assets/img/getting-started/arrow.png"
          class="hidden lg:inline-block absolute top-32 right-64 xl:right-[22rem] w-24 xl:w-[9.5rem]"
          alt=""
        />
      </div>
    </div>
  </section>
  <!-- Getting started section end-->

  <!-- FAQ section start-->
  <section class="w-full my-24">
    <BaseSection>
      <div data-aos="fade-right" data-aos-delay="150" class="col-span-12 lg:col-span-6">
        <div class="w-full">
          <img src="/src/assets/img/faq.webp" class="w-full" alt="" />
        </div>
      </div>
      <div
        data-aos="fade-left"
        data-aos-delay="150"
        class="col-span-12 lg:col-span-6 px-4 sm:px-6 mt-8"
      >
        <span class="text-base text-gradient font-semibold uppercase mb-4 sm:mb-2">Support</span>
        <h2 class="text-3xl sm:text-4xl font-semibold mb-10 sm:mb-6">Frequently asked questions</h2>

        <ul class="shadow-box">
          <BaseAccordion
            v-for="(accordion, index) in accordions"
            :key="index"
            :accordion="accordion"
          />
        </ul>
      </div>
    </BaseSection>
  </section>
  <!-- FAQ section end-->

  <BaseFooter />

  <RegisterModal :modalActive="modalActive" @update:modalActive="closeModal"></RegisterModal>
  <LoginModal :isLoginModalActive="isLoginModalActive"></LoginModal>
</template>
<div>
  
</div>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import CryptoStatistic from '../components/CryptoStatistic.vue'
import LandingExchange from '../components/Landing/LandingExchange.vue'
import BuyTradeImage from '@/components/Landing/BuyTradeImage.vue'
import BaseSection from '../components/base/Section.vue'
import PartnerImage from '../components/Landing/PartnerImage.vue'
import ListItem from '../components/Landing/ListItem.vue'
import BaseButton from '../components/base/BaseButton.vue'
import LandingStep from '../components/Landing/LandingStep.vue'
import clever from '@/assets/img/partner/clever.png'
import diamonCutts from '@/assets/img/partner/diamon-cutts.png'
import swissFinance from '@/assets/img/partner/swiss-finance.png'
import gambio from '@/assets/img/partner/gambio.png'
import TradingToolImage from '../components/Landing/TradingToolImage.vue'
import BaseAccordion from '../components/base/BaseAccordion.vue'
import RegisterModal from '../components/base/RegisterModal.vue'
import LoginModal from '../components/base/LoginModal.vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../components/base/supabase/supabase'
import BaseFooter from '../components/base/BaseFooter.vue'

interface Currency {
  img: string
  name: string
}

interface Cryptocurrency {
  img: string
  name: string
}

interface Trending {
  id: number
  name: string
  price: number
  logo: string
  increase: boolean
  data: number[]
}

interface Gainer {
  id: number
  name: string
  price: number
  logo: string
  increase: boolean
  data: number[]
}

interface Recent {
  id: number
  name: string
  price: number
  logo: string
  increase: boolean
  data: number[]
}

interface Accordion {
  title: string
  description: string
}

interface Step {
  img: string
  title: string
  description: string
}

export default defineComponent({
  components: {
    CryptoStatistic,
    LandingExchange,
    BuyTradeImage,
    BaseSection,
    PartnerImage,
    ListItem,
    TradingToolImage,
    BaseButton,
    LandingStep,
    BaseAccordion,
    RegisterModal,
    LoginModal,
    BaseFooter
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const selected = ref(0)
    const dropdownConcurency = ref(false)
    const dropdownCrypto = ref(false)
    const modalActive = ref(false)
    const isLoginModalActive = ref(false)

    const toggleModal = () => {
      modalActive.value = !modalActive.value
    }

    const toggleLoginModal = () => {
      console.log('toggle login modal clicked')
      isLoginModalActive.value = !isLoginModalActive.value
    }

    const partnerImages = [clever, diamonCutts, swissFinance, gambio]

    const currencySelected = ref<Currency>({
      img: 'country-icon/eng.png',
      name: 'USD'
    })
    const currencies = ref<Currency[]>([
      {
        img: 'country-icon/eng.png',
        name: 'USD'
      }
    ])
    const cryptoSelected = ref<Cryptocurrency>({
      img: 'crypto-icon/bitcoin.png',
      name: 'BTC'
    })
    const cryptocurrencies = ref<Cryptocurrency[]>([
      {
        img: 'crypto-icon/bitcoin.png',
        name: 'BTC'
      }
    ])
    const trendings = ref<Trending[]>([
      {
        id: 1,
        name: 'Bitcoin',
        price: 43180.13,
        logo: 'bitcoin.png',
        increase: true,
        data: [40, 35, 60, 75, 60, 75, 50]
      },
      {
        id: 2,
        name: 'Ethereum',
        price: 3480.65,
        logo: 'ethereum.png',
        increase: false,
        data: [25, 30, 60, 50, 80, 55, 80]
      },
      {
        id: 3,
        name: 'Solana',
        price: 150.2,
        logo: 'solana.png',
        increase: true,
        data: [40, 45, 40, 80, 50, 60, 35]
      },
      {
        id: 4,
        name: 'Dogecoin',
        price: 0.1572,
        logo: 'dogecoin.png',
        increase: true,
        data: [35, 70, 60, 80, 50, 60, 40]
      }
    ])
    const topGainers = ref<Gainer[]>([
      {
        id: 1,
        name: 'PAPPAY',
        price: 0.00374,
        logo: 'pappay.png',
        increase: true,
        data: [30, 50, 45, 60, 70, 40, 45]
      },
      {
        id: 2,
        name: 'Bitcoin Asia',
        price: 0.02096,
        logo: 'bitcoin-asia.png',
        increase: true,
        data: [25, 60, 50, 60, 35, 50, 70]
      },
      {
        id: 3,
        name: 'MoonRock',
        price: 0.004907,
        logo: 'moonrock.png',
        increase: true,
        data: [40, 35, 40, 25, 50, 70, 45]
      },
      {
        id: 4,
        name: 'NinjaFloki',
        price: 0.000123,
        logo: 'ninjafloki.png',
        increase: true,
        data: [45, 35, 40, 30, 25, 45, 35]
      }
    ])
    const recents = ref<Recent[]>([
      {
        id: 1,
        name: 'MetaCraft',
        price: 0.0608,
        logo: 'metacraft.png',
        increase: false,
        data: [40, 50, 45, 60, 35, 40, 45]
      },
      {
        id: 2,
        name: 'Frog',
        price: 0.5875,
        logo: 'frog.png',
        increase: false,
        data: [25, 50, 45, 48, 40, 60, 45]
      },
      {
        id: 3,
        name: 'Musk Doge',
        price: 0.04041,
        logo: 'musk-doge.png',
        increase: true,
        data: [25, 35, 60, 45, 50, 45, 45]
      },
      {
        id: 4,
        name: '2SHARE',
        price: 1366.24,
        logo: '2share.png',
        increase: true,
        data: [35, 30, 60, 50, 35, 45, 40]
      }
    ])
    const accordions = ref<Accordion[]>([
      {
        title: 'Why should I choose NEFA?',
        description:
          "We're industry pioneers, having been in the cryptocurrency industry since 2016. We've facilitated more than 21 billion USD worth of transactions on our exchange for customers in over 40 countries. Today, we're trusted by over 8 million customers around the world and have received praise for our easy-to-use app, secure wallet, and range of features."
      },
      {
        title: 'How secure is NEFA?',
        description:
          "We're industry pioneers, having been in the cryptocurrency industry since 2016. We've facilitated more than 21 billion USD worth of transactions on our exchange for customers in over 40 countries. Today, we're trusted by over million customers around the world and have received praise for our easy-to-use app, secure wallet, and range of features."
      },
      {
        title: 'Do I have to buy a whole Bitcoin?',
        description:
          "We're industry pioneers, having been in the cryptocurrency industry since 2016. We've facilitated more than 21 billion USD worth of transactions on our exchange for customers in over 40 countries. Today, we're trusted by over million customers around the world and have received praise for our easy-to-use app, secure wallet, and range of features."
      },
      {
        title: 'How do I actually buy Bitcoin?',
        description:
          "We're industry pioneers, having been in the cryptocurrency industry since 2016. We've facilitated more than 21 billion USD worth of transactions on our exchange for customers in over 40 countries. Today, we're trusted by over million customers around the world and have received praise for our easy-to-use app, secure wallet, and range of features."
      }
    ])
    const steps = ref<Step[]>([
      {
        img: 'sign-up.png',
        title: 'Sign Up',
        description:
          'Sign up for your free NEFA Wallet on web, iOS or Android and follow our easy process to set up your profile'
      },
      {
        img: 'fund.png',
        title: 'Fund',
        description:
          'Choose your preferred payment method such as bank transfer or credit card to top up your NEFA Wallet'
      },
      {
        img: 'buy-crypto.png',
        title: 'Buy Crypto',
        description:
          'Buy Bitcoin or Ethereum, then securely store it in your Wallet or send it on easily to your friends anywhere'
      }
    ])

    onMounted(async () => {
      const accessToken = route.query.access_token
      if (accessToken) {
        // Verify the token with Supabase (optional but recommended for security)
        const { user, error } = await supabase.auth.getUser(accessToken)
        if (user) {
          // If verification is successful, redirect to the dashboard
          router.push({ name: 'dashboard' })
        } else {
          console.error('Token verification failed:', error)
        }
      }
    })

    return {
      selected,
      dropdownConcurency,
      dropdownCrypto,
      currencySelected,
      currencies,
      cryptoSelected,
      cryptocurrencies,
      trendings,
      topGainers,
      recents,
      accordions,
      steps,
      partnerImages,
      toggleModal,
      modalActive,
      isLoginModalActive,
      toggleLoginModal
    }
  }
})
</script>

<style scoped></style>
