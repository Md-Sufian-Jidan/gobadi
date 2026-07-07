export default function ResuableTitleDescription({
    subTitle,
    title,
    description,
    align = 'center'
}: {
    subTitle: string;
    title: string;
    description: string;
    align?: 'left' | 'center';
}) {
    const isLeft = align === 'left';
    return (
        <div className={`flex flex-col ${isLeft ? 'items-start text-left' : 'items-center text-center'} gap-5`}>
            <h3 className={`inline-flex items-center gap-2 bg-accent/10 py-1.5 px-4 md:py-2 md:px-5 rounded-full border border-accent/20`}>
                <span className="text-xs md:text-sm font-bold font-display uppercase tracking-widest text-accent">
                    {subTitle}
                </span>
            </h3>
            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold font-display tracking-tight text-primary leading-[1.15]">
                {title}
            </h1>
            <p className="text-secondary font-normal text-base md:text-lg leading-relaxed">
                {description}
            </p>
        </div>
    )
}