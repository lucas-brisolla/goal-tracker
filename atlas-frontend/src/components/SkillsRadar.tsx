import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

type Props = {
    data: any;
}


function SkillsRadar({data}: Props) {

    return (
        <div className="bg-zinc-900 p-3 rounded-xl h-full border border-zinc-800 hover:scale-[1.01] hover:shadow-lg transition-all duration-300 col-span-2">
            <h2 className="text-zinc-400 text-sm mb-4">Suas habilidades</h2>

            <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={data?.skills} outerRadius={80}>
                    <PolarGrid stroke="#27272a" />
                    <PolarAngleAxis dataKey="skill" stroke="#a1a1aa" />
                    <Radar
                        name="SkillsChart"
                        dataKey="level"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.4}
                        className="drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SkillsRadar;