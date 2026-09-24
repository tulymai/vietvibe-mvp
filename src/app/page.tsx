"use client";

import { type ReactNode, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Info,
  Palette,
  Shirt,
  Sparkles,
} from "lucide-react";

const EVENTS = [
  "Dạo phố cuối tuần",
  "Sự kiện văn hóa",
  "Đi tiệc / Đám cưới",
  "Chụp ảnh nghệ thuật",
];
const STYLES = [
  "Tối giản thanh lịch",
  "Truyền thống chuẩn mực",
  "Cách tân cá tính",
  "Thơ mộng, nhẹ nhàng",
];
const COLORS = [
  "Tone ấm (Đỏ gạch/Cam/Nâu)",
  "Tone lạnh (Xanh cổ vịt/Lam)",
  "Trung tính (Trắng/Đen/Be)",
  "Màu pastel nhạt",
];

const LOOKS = [
  {
    id: "minimal",
    name: "Đương Đại Tối Giản",
    outfit: "Áo ngũ thân tay chẽn kết hợp quần âu ống rộng",
    accessories: "Quạt giấy gấp nhỏ gọn, giày bệt mũi nhọn",
    palette: ["#F5F5F0", "#E1D9C5", "#2C302E"],
    score: 98,
    emoji: "🍵",
    gradient: "from-[#F5F5F0] to-[#E1D9C5]",
    note: "Ưu tiên lớp áo trong kín đáo và phụ kiện tiết chế. Bạn có thể tìm hiểu thêm bối cảnh sử dụng để giữ tổng thể thanh lịch, thoải mái.",
  },
  {
    id: "spring",
    name: "Thơ Thẩn Chiều Xuân",
    outfit: "Áo tấc phối quần lĩnh tông trầm",
    accessories: "Khăn vấn nhẹ nhàng, guốc mộc quai trong",
    palette: ["#D4B5B0", "#9B3222", "#4A3B39"],
    score: 85,
    emoji: "🌸",
    gradient: "from-[#FDFBF7] to-[#D4B5B0]",
    note: "Phom tay rộng phù hợp với phụ kiện tối giản. Nên ưu tiên hoạt động nhẹ để tổng thể hài hòa và thuận tiện di chuyển.",
  },
  {
    id: "heritage",
    name: "Dấu Ấn Hoàng Hoa",
    outfit: "Áo cách tân lấy cảm hứng từ Nhật Bình",
    accessories: "Trâm cài tóc tối giản, khuyên tai nụ",
    palette: ["#0B5C5C", "#3D5A5A", "#C9A77D"],
    score: 72,
    emoji: "🦚",
    gradient: "from-[#E6EBEB] to-[#99B2B2]",
    note: "Look có sắc thái trang trọng. Kiểu tóc gọn gàng và phụ kiện vừa phải sẽ giúp tôn phom dáng, phù hợp cho sự kiện văn hóa hoặc chụp ảnh.",
  },
];

export default function Page() {
  const [showResults, setShowResults] = useState(false);
  const [event, setEvent] = useState(EVENTS[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [color, setColor] = useState(COLORS[0]);

  if (showResults) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-[#2C302E]">
        <div className="mx-auto max-w-4xl p-6 pt-10 md:pt-16">
          <button
            onClick={() => setShowResults(false)}
            className="group mb-8 flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-[#9B3222]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />{" "}
            Phối lại từ đầu
          </button>
          <header className="mb-12">
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-[#9B3222] uppercase">
              VietVibe gợi ý
            </p>
            <h1 className="mb-4 text-4xl font-serif tracking-tight md:text-5xl">
              Gợi ý phong cách
            </h1>
            <p className="flex flex-wrap gap-2 text-sm text-stone-500 md:text-base">
              <span>
                Sự kiện:{" "}
                <strong className="font-medium text-stone-700">{event}</strong>
              </span>
              <span>•</span>
              <span>
                Phong cách:{" "}
                <strong className="font-medium text-stone-700">{style}</strong>
              </span>
              <span>•</span>
              <span>
                Tone màu:{" "}
                <strong className="font-medium text-stone-700">{color}</strong>
              </span>
            </p>
          </header>
          <div className="space-y-8">
            {LOOKS.map((look) => (
              <article
                key={look.id}
                className="overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-sm transition hover:shadow-lg md:flex"
              >
                <div
                  className={`relative flex h-52 items-center justify-center bg-gradient-to-br p-8 md:h-auto md:w-1/3 ${look.gradient}`}
                >
                  <span className="text-7xl drop-shadow-md">{look.emoji}</span>
                  <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-bold text-[#0B5C5C] shadow-sm">
                    <CheckCircle2 className="h-4 w-4" /> Phù hợp {look.score}%
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                  <div>
                    <h2 className="mb-5 text-2xl font-serif font-medium">
                      {look.name}
                    </h2>
                    <dl className="mb-7 space-y-4 text-sm">
                      <div className="border-b border-stone-100 pb-4 md:flex">
                        <dt className="mb-1 w-24 shrink-0 text-[10px] font-semibold uppercase tracking-wider text-stone-400 md:mb-0">
                          Trang phục
                        </dt>
                        <dd className="text-stone-700">{look.outfit}</dd>
                      </div>
                      <div className="border-b border-stone-100 pb-4 md:flex">
                        <dt className="mb-1 w-24 shrink-0 text-[10px] font-semibold uppercase tracking-wider text-stone-400 md:mb-0">
                          Phụ kiện
                        </dt>
                        <dd className="text-stone-700">{look.accessories}</dd>
                      </div>
                      <div className="flex items-center gap-4">
                        <dt className="w-24 shrink-0 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                          Bảng màu
                        </dt>
                        <dd className="flex gap-3">
                          {look.palette.map((hex) => (
                            <span
                              key={hex}
                              title={hex}
                              style={{ backgroundColor: hex }}
                              className="h-7 w-7 rounded-full border border-stone-200 shadow-inner"
                            />
                          ))}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <section className="rounded-2xl border border-[#0B5C5C]/10 bg-[#0B5C5C]/5 p-4">
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0B5C5C]">
                      <Info className="h-4 w-4" /> Cultural Check
                    </h3>
                    <p className="text-sm leading-relaxed text-stone-600">
                      {look.note}
                    </p>
                  </section>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FDFBF7] p-6 font-sans text-[#2C302E]">
      <div className="w-full max-w-xl">
        <header className="mb-12 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-[#9B3222]/10 p-3.5 text-[#9B3222]">
            <Sparkles className="h-8 w-8" />
          </div>
          <h1 className="text-5xl font-serif tracking-tight">VietVibe</h1>
          <p className="mt-3 text-lg text-stone-500">
            Phối đẹp, hiểu đúng chất Việt.
          </p>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowResults(true);
          }}
          className="space-y-7 rounded-[2rem] border border-stone-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-10"
        >
          <SelectField
            label="Bạn chuẩn bị tham gia?"
            icon={<Calendar className="h-4 w-4" />}
            value={event}
            options={EVENTS}
            onChange={setEvent}
          />
          <SelectField
            label="Phong cách mong muốn?"
            icon={<Shirt className="h-4 w-4" />}
            value={style}
            options={STYLES}
            onChange={setStyle}
          />
          <SelectField
            label="Tone màu chủ đạo?"
            icon={<Palette className="h-4 w-4" />}
            value={color}
            options={COLORS}
            onChange={setColor}
          />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#9B3222] p-4 font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#852A1C] hover:shadow-lg"
          >
            Phối cho mình <Sparkles className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-7 text-center text-xs font-medium text-stone-400">
          VietVibe • Phối đẹp, hiểu đúng
        </p>
      </div>
    </main>
  );
}

function SelectField({
  label,
  icon,
  value,
  options,
  onChange,
}: {
  label: string;
  icon: ReactNode;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-semibold text-stone-800">
        <span className="text-[#0B5C5C]">{icon}</span>
        {label}
      </label>
      <div className="group relative">
        <select
          value={value}
          onChange={(event) =>
            onChange(
              (event.currentTarget as unknown as { value: string }).value,
            )
          }
          className="w-full appearance-none rounded-2xl border border-stone-200 bg-[#FDFBF7]/50 p-4 pr-12 font-medium text-stone-700 outline-none transition hover:border-[#0B5C5C]/30 focus:ring-2 focus:ring-[#0B5C5C]/20"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
      </div>
    </div>
  );
}
