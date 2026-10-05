"use client";

import { type ChangeEvent, type ReactNode, useMemo, useState } from "react";

import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  GitCompareArrows,
  Info,
  Palette,
  Shirt,
  Sparkles,
  Zap,
} from "lucide-react";

const FILTER_EVENTS = [
  "Dạo phố cuối tuần",
  "Sự kiện văn hóa",
  "Đi tiệc / Đám cưới",
  "Chụp ảnh nghệ thuật",
];
const FILTER_STYLES = [
  "Tối giản thanh lịch",
  "Truyền thống chuẩn mực",
  "Cách tân cá tính",
  "Thơ mộng, nhẹ nhàng",
];
const FILTER_COLORS = [
  "Tone ấm (Đỏ gạch/Cam/Nâu)",
  "Tone lạnh (Xanh cổ vịt/Lam)",
  "Trung tính (Trắng/Đen/Be)",
  "Màu pastel nhạt",
];

const mockLooks = [
  {
    id: "look-1",
    name: "Đương Đại Tối Giản",
    outfitType: "Áo ngũ thân cách tân",
    outfit: "Áo ngũ thân tay chẽn kết hợp quần âu ống rộng",
    accessories: "Quạt giấy gấp nhỏ gọn, giày bệt mũi nhọn",
    palette: ["#F5F5F0", "#E1D9C5", "#2C302E"],
    image: "/ao-ngu-than.png",
    gradient: "from-[#F5F5F0] to-[#E1D9C5]",
    heritageScore: 70,
    remixScore: 85,
    preserve: "Phom dáng ngũ thân kín đáo, cổ đứng thanh lịch.",
    modernize:
      "Kết hợp quần âu ống rộng và chất liệu thoáng mát cho ngày thường.",
    story:
      "Áo ngũ thân là một dạng trang phục truyền thống thường được nhận biết qua phom dáng kín đáo, chỉn chu. Phiên bản này giữ tinh thần thanh lịch trong cách ứng dụng hiện đại.",
    culturalCheck:
      "Ưu tiên lớp áo trong kín đáo và phụ kiện tiết chế để tổng thể thanh lịch, thoải mái.",
    bestEvents: ["Dạo phố cuối tuần", "Đi tiệc / Đám cưới"],
    bestStyles: ["Tối giản thanh lịch", "Thơ mộng, nhẹ nhàng"],
    bestColors: ["Trung tính (Trắng/Đen/Be)", "Màu pastel nhạt"],
  },
  {
    id: "look-2",
    name: "Thơ Thẩn Chiều Xuân",
    outfitType: "Áo tấc mềm mại",
    outfit: "Áo tấc phối quần lĩnh tông trầm",
    accessories: "Khăn vấn nhẹ nhàng, guốc mộc quai trong",
    palette: ["#D4B5B0", "#9B3222", "#4A3B39"],
    image: "/ao-tac.png",
    gradient: "from-[#FDFBF7] to-[#D4B5B0]",
    heritageScore: 90,
    remixScore: 40,
    preserve: "Kiểu dáng tay thụng và sắc thái trang trọng của áo tấc.",
    modernize: "Bảng màu mềm, phụ kiện tối giản giúp tổng thể trẻ trung hơn.",
    story:
      "Áo tấc thường gợi nhắc đến những không gian văn hóa mang sắc thái trang trọng. Phần tay áo rộng tạo vẻ khoan thai, phù hợp hơn với hoạt động nhẹ hoặc dịp kỷ niệm.",
    culturalCheck:
      "Phom tay rộng hợp với phụ kiện tiết chế; ưu tiên hoạt động nhẹ để thuận tiện di chuyển.",
    bestEvents: ["Sự kiện văn hóa", "Đi tiệc / Đám cưới"],
    bestStyles: ["Truyền thống chuẩn mực", "Thơ mộng, nhẹ nhàng"],
    bestColors: ["Tone ấm (Đỏ gạch/Cam/Nâu)", "Trung tính (Trắng/Đen/Be)"],
  },
  {
    id: "look-3",
    name: "Dấu Ấn Hoàng Hoa",
    outfitType: "Cảm hứng Nhật Bình",
    outfit: "Áo cách tân lấy cảm hứng từ Nhật Bình",
    accessories: "Trâm cài tóc tối giản, khuyên tai nụ",
    palette: ["#0B5C5C", "#3D5A5A", "#C9A77D"],
    image: "/dau-an-hoang-hoa.png",
    gradient: "from-[#E6EBEB] to-[#99B2B2]",
    heritageScore: 60,
    remixScore: 95,
    preserve: "Bố cục dải màu và phom khoác ngoài mang tính gợi nhắc.",
    modernize: "Độ dài áo tinh gọn hơn, dễ phối cùng trang phục ứng dụng.",
    story:
      "Nhật Bình là một loại trang phục truyền thống gắn với không gian cung đình. Look này chỉ lấy cảm hứng từ dải màu và bố cục trang phục, không đại diện cho Nhật Bình nguyên bản.",
    culturalCheck:
      "Look có sắc thái trang trọng; kiểu tóc gọn gàng và phụ kiện vừa phải sẽ giúp tôn phom dáng.",
    bestEvents: ["Chụp ảnh nghệ thuật", "Sự kiện văn hóa"],
    bestStyles: ["Cách tân cá tính"],
    bestColors: ["Tone lạnh (Xanh cổ vịt/Lam)", "Tone ấm (Đỏ gạch/Cam/Nâu)"],
  },
];

export default function Page() {
  const [showResults, setShowResults] = useState(false);
  const [event, setEvent] = useState(FILTER_EVENTS[0]);
  const [style, setStyle] = useState(FILTER_STYLES[0]);
  const [color, setColor] = useState(FILTER_COLORS[0]);
  const [openCompareId, setOpenCompareId] = useState<string | null>(null);

  const recommendedLooks = useMemo(() => {
    return mockLooks
      .map((look) => {
        const score =
          (look.bestEvents.includes(event) ? 50 : 0) +
          (look.bestStyles.includes(style) ? 30 : 0) +
          (look.bestColors.includes(color) ? 20 : 0);
        return {
          ...look,
          sortScore: score,
          matchScore: Math.min(98, 65 + Math.round(score * 0.33)),
        };
      })
      .sort((a, b) => b.sortScore - a.sortScore);
  }, [event, style, color]);

  if (showResults) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] pb-20 text-[#2C302E]">
        <div className="mx-auto max-w-4xl p-6 pt-10 md:pt-16">
          <button
            onClick={() => setShowResults(false)}
            className="group mb-8 flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-[#9B3222]"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1" /> Phối
            lại từ đầu
          </button>
          <header className="mb-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#9B3222]">
              VietVibe gợi ý
            </p>
            <h1 className="mb-3 text-4xl font-serif md:text-5xl">
              Gợi ý phong cách
            </h1>
            <p className="text-sm text-stone-500 md:text-base">
              Dựa trên: {event} • {style} • {color}
            </p>
          </header>
          <div className="space-y-8">
            {recommendedLooks.map((look) => (
              <article
                key={look.id}
                className="overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-sm md:flex"
              >
                <div
                  className={`relative flex h-52 flex-col items-center justify-center bg-gradient-to-br p-8 md:h-auto md:w-1/3 ${look.gradient}`}
                >
                  <img
                    src={look.image}
                    alt={`Minh họa ${look.outfitType}`}
                    className="h-48 w-auto object-contain"
                  />
                  <span className="mt-4 text-center font-serif text-lg font-medium">
                    {look.outfitType}
                  </span>
                  <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#0B5C5C]">
                    <CheckCircle2 className="h-4 w-4" /> Phù hợp{" "}
                    {look.matchScore}%
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-[#9B3222]/10 px-3 py-1.5 text-xs font-semibold text-[#9B3222]">
                    Gợi ý phối
                  </span>
                </div>
                <div className="flex-1 p-6 md:p-8">
                  <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                    <h2 className="text-2xl font-serif">{look.name}</h2>
                    <button
                      onClick={() =>
                        setOpenCompareId(
                          openCompareId === look.id ? null : look.id,
                        )
                      }
                      className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-600"
                    >
                      <GitCompareArrows className="h-3.5 w-3.5" /> So sánh
                    </button>
                  </div>
                  <dl className="mb-6 space-y-4 text-sm">
                    <InfoLine label="Trang phục">{look.outfit}</InfoLine>
                    <InfoLine label="Phụ kiện">{look.accessories}</InfoLine>
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
                            className="h-7 w-7 rounded-full border border-stone-200"
                          />
                        ))}
                      </dd>
                    </div>
                  </dl>
                  <section className="mb-6 rounded-2xl border border-stone-100 bg-[#FDFBF7] p-5">
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                      <Zap className="h-4 w-4 text-[#9B3222]" /> Bản sắc & Remix
                    </h3>
                    <ScoreBar
                      label="Bản sắc Việt"
                      score={look.heritageScore}
                      color="bg-[#9B3222]"
                    />
                    <ScoreBar
                      label="Điểm Remix Gen Z"
                      score={look.remixScore}
                      color="bg-[#0B5C5C]"
                    />
                    <p className="mt-4 text-sm">
                      <strong>Giữ lại:</strong>{" "}
                      <span className="text-stone-600">{look.preserve}</span>
                    </p>
                    <p className="mt-2 text-sm">
                      <strong>Làm mới:</strong>{" "}
                      <span className="text-stone-600">{look.modernize}</span>
                    </p>
                    <p className="mt-4 text-[11px] italic text-stone-400">
                      * Phiên bản này lấy cảm hứng từ Việt phục, không thay thế
                      trang phục nguyên bản.
                    </p>
                  </section>
                  {openCompareId === look.id && (
                    <section className="mb-6 rounded-2xl border border-stone-100 bg-stone-50 p-5">
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                        <GitCompareArrows className="h-4 w-4" /> So sánh phong
                        cách
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <CompareBlock
                          title="Giữ nét truyền thống"
                          text={look.preserve}
                        />
                        <CompareBlock
                          title="Phiên bản Gen Z"
                          text={look.modernize}
                        />
                      </div>
                    </section>
                  )}
                  <section className="mb-4 rounded-2xl border border-[#0B5C5C]/10 bg-[#0B5C5C]/5 p-4">
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0B5C5C]">
                      <Info className="h-4 w-4" /> Cultural Check
                    </h3>
                    <p className="text-sm leading-relaxed text-stone-600">
                      {look.culturalCheck}
                    </p>
                  </section>
                  <section className="rounded-2xl border border-[#9B3222]/10 bg-[#9B3222]/5 p-4">
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#9B3222]">
                      <BookOpen className="h-4 w-4" /> Câu chuyện Việt phục
                    </h3>
                    <p className="text-sm leading-relaxed text-stone-600">
                      {look.story}
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
    <main className="flex min-h-screen items-center justify-center bg-[#FDFBF7] p-6 text-[#2C302E]">
      <div className="w-full max-w-xl">
        <header className="mb-12 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-[#9B3222]/10 p-3.5 text-[#9B3222]">
            <Sparkles className="h-8 w-8" />
          </div>
          <h1 className="text-5xl font-serif">VietVibe</h1>
          <p className="mt-3 text-lg text-stone-500">
            Phối đẹp, hiểu đúng chất Việt.
          </p>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowResults(true);
          }}
          className="space-y-7 rounded-[2rem] border border-stone-100 bg-white p-6 shadow-sm md:p-10"
        >
          <SelectField
            label="Bạn chuẩn bị tham gia?"
            icon={<Calendar className="h-4 w-4" />}
            value={event}
            options={FILTER_EVENTS}
            onChange={setEvent}
          />
          <SelectField
            label="Phong cách mong muốn?"
            icon={<Shirt className="h-4 w-4" />}
            value={style}
            options={FILTER_STYLES}
            onChange={setStyle}
          />
          <SelectField
            label="Tone màu chủ đạo?"
            icon={<Palette className="h-4 w-4" />}
            value={color}
            options={FILTER_COLORS}
            onChange={setColor}
          />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#9B3222] p-4 font-medium text-white hover:bg-[#852A1C]"
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
          onChange={(event) => {
            const selectedValue = (
              event.currentTarget as unknown as { value: string }
            ).value;

            onChange(selectedValue);
          }}
          className="w-full appearance-none rounded-2xl border border-stone-200 bg-[#FDFBF7]/50 p-4 pr-12 font-medium text-stone-700 outline-none focus:ring-2 focus:ring-[#0B5C5C]/20"
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

function InfoLine({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-stone-100 pb-4 md:flex">
      <dt className="mb-1 w-24 shrink-0 text-[10px] font-semibold uppercase tracking-wider text-stone-400 md:mb-0">
        {label}
      </dt>
      <dd className="text-stone-700">{children}</dd>
    </div>
  );
}

function ScoreBar({
  label,
  score,
  color,
}: {
  label: string;
  score: number;
  color: string;
}) {
  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-stone-600">{label}</span>
        <strong>{score}%</strong>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function CompareBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-stone-100 bg-white p-3">
      <p className="mb-1 text-xs font-semibold text-[#9B3222]">{title}</p>
      <p className="text-sm text-stone-600">{text}</p>
    </div>
  );
}
