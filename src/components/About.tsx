'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-light text-center mb-16 tracking-[0.2em]">ABOUT</h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-full"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/about_img.jpeg"
                  alt="송엘리 작가"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-light tracking-[0.15em]">
                송엘리 <span className="text-2xl tracking-normal">Elly Song</span>
              </h3>

              <div className="space-y-6 text-gray-600 leading-relaxed font-light">
                <p>
                  산티아고 순례길 1,400km를 걸은 도보 여행의 경험을 바탕으로,
                  <br />
                  비단 위에 전통 채색화 기법을 사용해 다양한 기후와 환경 속
                  <br />
                  &apos;길 위의 풍경&apos;을 작업하고 있습니다.
                </p>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <h4 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-6">CV</h4>
                <div className="space-y-6 text-sm text-gray-600 font-light">
                  {/* 학력 */}
                  <div>
                    <h5 className="font-normal text-gray-800 mb-3">학력</h5>
                    <ul className="space-y-2 ml-4">
                      <li>한성대학교 회화과 졸업</li>
                      <li>한성대학교 융복합디자인학부 졸업</li>
                      <li>한성대학교 대학원 진채화 전공 수료</li>
                    </ul>
                  </div>

                  {/* 개인전 */}
                  <div>
                    <h5 className="font-normal text-gray-800 mb-3">개인전</h5>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-3 min-w-[40px]">2025</span>
                        <span>뜻밖의 여정, 57th 갤러리 (11월 예정)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-3 min-w-[40px]">2023</span>
                        <span>난 죽기엔 너무 귀여워, 갤러리 카페 하유</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-3 min-w-[40px]">2021</span>
                        <span>개천에서 용 났대!, 갤러리 솜</span>
                      </li>
                    </ul>
                  </div>

                  {/* 단체전 */}
                  <div>
                    <h5 className="font-normal text-gray-800 mb-3">단체전</h5>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-3 min-w-[40px]">2024</span>
                        <span>아시아프, 백성희장민호극장</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-3 min-w-[40px]">2023</span>
                        <div className="flex-1 space-y-1">
                          <div>Shadows of Memory – 송엘리×신윤영 2인전, 하랑갤러리</div>
                          <div>한국의 전통, 채색의 미, 주일대한민국대사관 한국문화원, 도쿄</div>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-3 min-w-[40px]">2022</span>
                        <div className="flex-1 space-y-1">
                          <div>포근포근, 369예술터</div>
                          <div>별별전, 운현궁 기획전시실</div>
                          <div>우리는 누구나 어린이였다, 하랑갤러리</div>
                          <div>세화전, 갤러리 한옥</div>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-3 min-w-[40px]">2021</span>
                        <span>아시아프, 홍익대학교 현대미술전시실</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}