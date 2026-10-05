"use client";

import { type ReactNode, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Calendar,
  CheckCircle2,
  ChevronDown,
  GitCompareArrows,
  Info,
  Palette,
  Shirt,
  Sparkles,
  Star,
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

type Look = {
  id: string;
  name: string;
  outfitType: string;
  outfit: string;
  accessories: string;
  palette: string[];
  image: string;
  gradient: string;
  heritageScore: number;
  remixScore: number;
  preserve: string;
  modernize: string;
  story: string;
  culturalCheck: string;
  bestEvents: string[];
  bestStyles: string[];
  bestColors: string[];
};

const mockLooks: Look[] = [
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
  const [savedLookIds, setSavedLookIds] = useState<string[]>([]);

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
  }, [color, event, style]);

  function toggleSavedLook(id: string) {
    setSavedLookIds((previous) =>
      previous.includes(id)
        ? previous.filter((lookId) => lookId !== id)
        : [...previous, id],
    );
  }

  if (showResults) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#fcfaf6] pb-20 text-[#2c302e]">
        <div className="relative mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
          <div className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full bg-[#d4b5b0]/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-28 top-72 h-72 w-72 rounded-full bg-[#0b5c5c]/10 blur-3xl" />

          <nav className="relative mb-10 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setShowResults(false)}
              className="group inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/75 px-4 py-2 text-sm font-semibold text-stone-600 shadow-sm transition hover:-translate-x-0.5 hover:border-[#9b3222]/30 hover:text-[#9b3222]"
            >
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
              Phối lại từ đầu
            </button>

            <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/75 px-4 py-2 text-sm font-semibold text-stone-600 shadow-sm">
              <BookmarkCheck className="h-4 w-4 text-[#9b3222]" />
              <span>{savedLookIds.length} look đã lưu</span>
            </div>
          </nav>

          <header className="relative mb-10 max-w-3xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#9b3222]">
              <Sparkles className="h-4 w-4" /> VietVibe Studio
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-stone-900 md:text-6xl">
              Lookbook đương đại
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-500 md:text-base">
              Ba gợi ý được xếp hạng theo bối cảnh, phong cách và bảng màu bạn
              đã chọn.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[event, style, color].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-stone-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </header>

          <section className="relative space-y-8">
            {recommendedLooks.map((look, index) => {
              const isSaved = savedLookIds.includes(look.id);
              const isComparing = openCompareId === look.id;

              return (
                <article
                  key={look.id}
                  className="group overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-[0_20px_55px_-38px_rgba(43,48,46,0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_65px_-35px_rgba(43,48,46,0.45)] md:grid md:grid-cols-[1fr_1fr]"
                >
                  <div
                    className={`relative flex min-h-[560px] flex-col overflow-hidden bg-gradient-to-br ${look.gradient} p-6 md:min-h-full md:p-8`}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-white/70" />
                    <div className="absolute -right-16 top-20 h-56 w-56 rounded-full border-[20px] border-white/25" />
                    <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border-[20px] border-white/25" />
                    <div className="absolute left-7 top-28 h-px w-24 bg-stone-700/15" />

                    <div className="relative z-10 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#0B5C5C] shadow-sm">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Phù hợp {look.matchScore}%
                      </span>

                      {index === 0 && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9B3222] px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-[#9B3222]/20">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          Gợi ý hàng đầu
                        </span>
                      )}
                    </div>

                    <div className="relative z-10 flex flex-1 items-center justify-center py-5">
                      <div className="relative grid h-[290px] w-[250px] place-items-center rounded-[3rem] border border-white/50 bg-white/15 shadow-[0_24px_45px_-28px_rgba(44,48,46,0.45)] backdrop-blur-[2px] md:h-[390px] md:w-[320px]">
                        <span className="absolute left-5 top-5 text-xs font-bold tracking-[0.25em] text-stone-600/70">
                          LOOK 0{index + 1}
                        </span>

                        <img
                          src={look.image}
                          alt={`Minh họa ${look.outfitType}`}
                          className="relative z-10 h-[440px] w-auto object-contain drop-shadow-[0_32px_24px_rgba(44,48,46,0.34)] transition duration-500 group-hover:scale-105 md:h-[355px]"
                        />
                      </div>
                    </div>

                    <div className="relative z-10 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                          Dòng trang phục
                        </p>
                        <p className="mt-1 text-xl font-semibold text-stone-800">
                          {look.outfitType}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSavedLook(look.id)}
                        className={`grid h-11 w-11 place-items-center rounded-full border transition ${
                          isSaved
                            ? "border-[#9B3222] bg-[#9B3222] text-white shadow-lg shadow-[#9B3222]/25"
                            : "border-white/80 bg-white/80 text-stone-600 shadow-sm hover:bg-white"
                        }`}
                        aria-label={
                          isSaved ? "Bỏ lưu look" : "Lưu vào lookbook"
                        }
                      >
                        {isSaved ? (
                          <BookmarkCheck className="h-5 w-5" />
                        ) : (
                          <Bookmark className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#9b3222]">
                          Gợi ý phối
                        </p>
                        <h2 className="font-editorial text-3xl font-semibold">
                          {look.name}
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenCompareId(isComparing ? null : look.id)
                        }
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition ${
                          isComparing
                            ? "border-stone-800 bg-stone-800 text-white"
                            : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:bg-stone-100"
                        }`}
                      >
                        <GitCompareArrows className="h-4 w-4" />
                        {isComparing ? "Đóng so sánh" : "So sánh"}
                      </button>
                    </div>

                    <dl className="mb-6 divide-y divide-stone-100 rounded-2xl border border-stone-100 bg-stone-50/60 px-4">
                      <InfoLine label="Trang phục">{look.outfit}</InfoLine>
                      <InfoLine label="Phụ kiện">{look.accessories}</InfoLine>
                      <div className="flex gap-4 py-4">
                        <dt className="w-24 shrink-0 pt-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          Bảng màu
                        </dt>
                        <dd className="flex flex-wrap gap-2">
                          {look.palette.map((hex) => (
                            <span
                              key={hex}
                              title={hex}
                              style={{ backgroundColor: hex }}
                              className="h-7 w-7 rounded-full border-2 border-white shadow-sm ring-1 ring-stone-200"
                            />
                          ))}
                        </dd>
                      </div>
                    </dl>

                    <section className="mb-5 rounded-2xl border border-[#9b3222]/10 bg-[#fdf8f5] p-5">
                      <h3 className="mb-5 flex items-center gap-2 text-sm font-bold text-stone-800">
                        <Zap className="h-4 w-4 text-[#9b3222]" /> Bản sắc &
                        Remix
                      </h3>
                      <ScoreBar
                        label="Bản sắc Việt"
                        score={look.heritageScore}
                        color="bg-[#9b3222]"
                      />
                      <ScoreBar
                        label="Điểm Remix Gen Z"
                        score={look.remixScore}
                        color="bg-[#0b5c5c]"
                      />
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <MiniInsight
                          label="Giữ lại"
                          text={look.preserve}
                          accent="text-[#9b3222]"
                        />
                        <MiniInsight
                          label="Làm mới"
                          text={look.modernize}
                          accent="text-[#0b5c5c]"
                        />
                      </div>
                      <p className="mt-4 text-[11px] leading-relaxed text-stone-400">
                        Phiên bản này lấy cảm hứng từ Việt phục, không thay thế
                        trang phục nguyên bản.
                      </p>
                    </section>

                    {isComparing && (
                      <section className="mb-5 rounded-2xl border border-stone-200 bg-stone-50 p-5">
                        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-stone-800">
                          <GitCompareArrows className="h-4 w-4" /> So sánh phong
                          cách
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <CompareBlock
                            title="Tinh thần truyền thống"
                            text={look.preserve}
                            tone="warm"
                          />
                          <CompareBlock
                            title="Phiên bản Gen Z"
                            text={look.modernize}
                            tone="cool"
                          />
                        </div>
                      </section>
                    )}

                    <div className="grid gap-4 lg:grid-cols-2">
                      <section className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-4">
                        <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-900">
                          <Info className="h-4 w-4" /> Cultural Check
                        </h3>
                        <p className="text-sm leading-relaxed text-stone-600">
                          {look.culturalCheck}
                        </p>
                      </section>
                      <section className="rounded-2xl border border-[#9b3222]/10 bg-[#9b3222]/[0.045] p-4">
                        <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-[#9b3222]">
                          <BookOpen className="h-4 w-4" /> Câu chuyện Việt phục
                        </h3>
                        <p className="text-sm leading-relaxed text-stone-600">
                          {look.story}
                        </p>
                      </section>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fcfaf6] px-5 py-12 text-[#2c302e]">
      <div className="pointer-events-none absolute -left-28 top-8 h-80 w-80 rounded-full bg-[#d4b5b0]/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-[#0b5c5c]/10 blur-3xl" />

      <div className="relative w-full max-w-xl">
        <header className="mb-9 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#9b3222]/15 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#9b3222] shadow-sm">
            <Sparkles className="h-4 w-4" /> VietVibe Studio
          </div>
          <h1 className="font-editorial text-5xl font-semibold">VietVibe</h1>
          <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-stone-500">
            Phối đẹp, hiểu đúng chất Việt — theo cách của riêng bạn.
          </p>
        </header>

        <form
          onSubmit={(eventForm) => {
            eventForm.preventDefault();
            setShowResults(true);
          }}
          className="rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_30px_75px_-45px_rgba(43,48,46,0.55)] backdrop-blur md:p-9"
        >
          <div className="mb-8 grid grid-cols-3 gap-3">
            {["Bối cảnh", "Cá tính", "Bảng màu"].map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-2 text-xs font-semibold text-stone-500"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#9b3222] text-[11px] text-white">
                  {index + 1}
                </span>
                <span className="hidden sm:inline">{step}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <SelectField
              label="Bạn sắp đi đâu?"
              icon={<Calendar className="h-4 w-4" />}
              value={event}
              options={FILTER_EVENTS}
              onChange={setEvent}
            />
            <SelectField
              label="Phong cách bạn muốn thể hiện?"
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
          </div>

          <button
            type="submit"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#9b3222] px-5 py-4 font-bold text-white shadow-lg shadow-[#9b3222]/25 transition hover:-translate-y-0.5 hover:bg-[#84291d] hover:shadow-xl hover:shadow-[#9b3222]/25"
          >
            Tạo lookbook của mình <Sparkles className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-xs font-medium text-stone-400">
          VietVibe • Đương đại & Bản sắc
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
    <div className="space-y-2.5">
      <label className="flex items-center gap-2 text-sm font-bold text-stone-800">
        <span className="text-[#0b5c5c]">{icon}</span>
        {label}
      </label>
      <div className="group relative">
        <select
          value={value}
          onChange={(eventSelect) => {
            const selectedValue = (
              eventSelect.currentTarget as unknown as { value: string }
            ).value;

            onChange(selectedValue);
          }}
          className="w-full appearance-none rounded-2xl border border-stone-200 bg-[#fdfbf7] px-4 py-3.5 pr-12 text-sm font-medium text-stone-700 outline-none transition focus:border-[#0b5c5c]/40 focus:ring-4 focus:ring-[#0b5c5c]/10"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400 transition group-focus-within:text-[#0b5c5c]" />
      </div>
    </div>
  );
}

function InfoLine({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 py-4">
      <dt className="w-24 shrink-0 pt-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-stone-700">{children}</dd>
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
    <div className="mb-4 last:mb-0">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium text-stone-600">{label}</span>
        <strong className="text-stone-800">{score}%</strong>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-stone-200/80">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function MiniInsight({
  label,
  text,
  accent,
}: {
  label: string;
  text: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl bg-white/75 p-3.5">
      <p className={`mb-1 text-xs font-bold ${accent}`}>{label}</p>
      <p className="text-sm leading-relaxed text-stone-600">{text}</p>
    </div>
  );
}

function CompareBlock({
  title,
  text,
  tone,
}: {
  title: string;
  text: string;
  tone: "warm" | "cool";
}) {
  const color =
    tone === "warm"
      ? "border-[#9b3222]/15 bg-[#9b3222]/5 text-[#9b3222]"
      : "border-[#0b5c5c]/15 bg-[#0b5c5c]/5 text-[#0b5c5c]";
  return (
    <div className={`rounded-xl border p-4 ${color}`}>
      <p className="mb-2 text-xs font-bold">{title}</p>
      <p className="text-sm leading-relaxed text-stone-600">{text}</p>
    </div>
  );
}
