// 用户确认：治理前后均为任务执行记录；本例为典型案例。
// 模型名称保留原始记录的写法，不作官方型号认证。
export const toolhubTask = "找出我 Notion 中最近修改过的 20 篇文档。";
export const toolhubStages = [
	{
		id: "router",
		name: "Router",
		model: "Gemini 3.1 Flash Lite",
		before: { input: 7003, output: 21, schema: 0, action: "判断为新任务，不选择工具。" },
		after: {
			input: 8661,
			output: 35,
			schema: 0,
			action: "判断为新任务，并提前选出 search_docs；工具目录放在提示词中，不作为 Schema 注入。",
		},
	},
	{
		id: "planner-one",
		name: "Planner · 第一次",
		model: "Gemini 3.7 Flash",
		before: {
			input: 43088,
			output: 18,
			schema: 122,
			action: "从全量 122 个工具 Schema 中选择并调用 Notion 文档搜索。",
		},
		after: {
			input: 19670,
			output: 17,
			schema: 7,
			action: "在提前筛选后加载的 7 个工具 Schema 范围内，调用 Notion 文档搜索。",
		},
	},
	{
		id: "planner-two",
		name: "Planner · 第二次",
		model: "Gemini 3.7 Flash",
		before: {
			input: 47888,
			output: 99,
			schema: 122,
			action: "接收返回的 20 条文档信息并回复；本轮仍注入 122 个工具 Schema。",
		},
		after: {
			input: 24470,
			output: 95,
			schema: 7,
			action: "根据返回的 20 条文档信息回复；本轮仍注入 7 个工具 Schema。",
		},
	},
] as const;
export const toolhubTotals = {
	before: {
		input: toolhubStages.reduce((n, s) => n + s.before.input, 0),
		output: toolhubStages.reduce((n, s) => n + s.before.output, 0),
	},
	after: {
		input: toolhubStages.reduce((n, s) => n + s.after.input, 0),
		output: toolhubStages.reduce((n, s) => n + s.after.output, 0),
	},
};
export const formatToken = (n: number) => n.toLocaleString("en-US");
export const inputReduction = (
	(1 - toolhubTotals.after.input / toolhubTotals.before.input) *
	100
).toFixed(1);
