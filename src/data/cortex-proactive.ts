// 00 评测闭环流水线（横向 4 步流转）
export const evalWorkflowSteps = [
	{
		num: "01",
		title: "真实内测采样",
		desc: "保存授权范围内生成快照，抽样运行 Judge；点踩反馈与代码拦截样本单独归集。",
	},
	{
		num: "02",
		title: "问题复盘与标准修订",
		desc: "PM 与研发定期复盘 Bad Case，不逐条写标准答案，依靠试标持续拉齐 Rubric 与负向约束。",
	},
	{
		num: "03",
		title: "自动评测与复核",
		desc: "LLM Judge 对照输入快照离线自动质检（D1—D3 三元判定），歧义与冲突样本标记待复核。",
	},
	{
		num: "04",
		title: "固定样本回归",
		desc: "确认修复的问题沉淀为固定负向回归集，修改 Prompt 或升级模型时重跑防范劣化。",
	},
];

// 01 评测输入：保留同一次生成的完整快照契约
export const evalSnapshotContract = [
	{
		component: "InputBundle",
		content: "本次上线／上座时间及其时区、白名单内的 LiveMem kinds 与记录、实时查询返回的内容",
	},
	{
		component: "来源信息",
		content: "来源 ID、原文或结构化字段、更新时间、数据获取状态",
	},
	{
		component: "生成结果",
		content: "三段式卡片、语音文本、事项 ID、来源引用（作为内部元数据，不占用卡片篇幅）",
	},
	{
		component: "运行信息",
		content: "模型版本、提示词版本、筛选规则版本、生成与校验实测耗时",
	},
];

// 02 Gate 1：在线代码门禁——呈现与确定性约束（生成后、交付前同步执行）
export const gate1CodeRules = [
	{
		item: "结构合规",
		rule: "校验约定的交付 JSON Schema；组件与字段合法，允许分区空数组",
		fallback: "使用预设降级界面",
	},
	{
		item: "口播字数硬限",
		rule: "语音口播严格 ≤25 个字符（仅提炼 1 句话），允许为空；严禁长篇大论念经",
		fallback: "超限直接静默不播报，保留屏幕卡片展示",
	},
	{
		item: "口播单焦点",
		rule: "非空口播只能关联卡片中单一最高优先级事项 ID，且该事项必须实际展示",
		fallback: "关联无效则保持静默",
	},
	{
		item: "模态一致",
		rule: "语音使用被选事项的同一份短文本字段，不另行生成一份独立改写",
		fallback: "从数据结构上避免两份文本相互矛盾",
	},
	{
		item: "空态呈现",
		rule: "分区为空时，由渲染器展示固定空态；无播报事项时保持静默",
		fallback: "不调用模型补齐空态文案",
	},
	{
		item: "日程有效",
		rule: "对关联到明确日程 ID 的会议提醒，按当前时间、时区和取消状态过滤",
		fallback: "移除失效提醒，同步清除其语音引用",
	},
];

// 03 Gate 2：语义质检核心 Rubric（D1—D3 三大维度对照输入核查）
export const gate2SemanticRubric = [
	{
		dimension: "D1 事实保真",
		rule: "主体、时间、责任、状态及条件是否有输入支持；是否捏造承诺、风险或确定性结论",
		tolerance: "允许同义压缩和口语化提炼，不允许改变事实含义；建议不能冒充已有承诺；无证据标记“无依据断言”",
	},
	{
		dimension: "D2 时间有效与噪音抑制",
		rule: "是否展示已失效事项、纯闲聊、无行动关联的人设信息，以及明确与用户无关的内容",
		tolerance: "不将大群广播一律视为噪音（涉及本人责任/行动保留）；仍未完成的承诺不因记录 >48h 被删除",
	},
	{
		dimension: "D3 项目归并",
		rule: "事项被归入某项目时，是否存在项目名称、别名或上下文关联证据；是否出现明确错归或无依据归并",
		tolerance: "项目未知时允许独立展示；多个项目均有可能时不强猜；不核查主观重要性与漏报率",
	},
];

// 04 统一三元裁决体系（D1—D3 分别采用三元判定，不打模糊总分）
export const triStateVerdicts = [
	{
		verdict: "通过（PASS）",
		condition: "本次检查未发现明确违规（仅代表本次检查未发现问题，不证明完全正确）",
		handling: "记录自动检查结果，正常计入交付基线",
		type: "pass",
	},
	{
		verdict: "不通过（FAIL）",
		condition: "有明确事实冲突、无依据断言、失效或无关内容、错误项目归并",
		handling: "返回问题片段、输入证据和原因，进入问题复盘",
		type: "fail",
	},
	{
		verdict: "待复核（REVIEW）",
		condition: "来源冲突或上下文歧义，无法可靠裁决（必须有具体原因，不能只写“模型不确定”）",
		handling: "说明具体冲突或缺失信息，供 PM／研发抽样查看",
		type: "review",
	},
];

// 三个典型边界判定示例
export const triStateBoundaryExamples = [
	{
		scenario: "输入未指定负责人，输出却写“由你负责”",
		verdict: "不通过（FAIL）",
		rationale: "属于无依据断言，捏造责任主体",
		type: "fail",
	},
	{
		scenario: "两条来源分别写“已完成”和“未完成”，无法确认有效版本",
		verdict: "待复核（REVIEW）",
		rationale: "来源数据真实冲突，供人工抽样介入判断",
		type: "review",
	},
	{
		scenario: "项目归属不明，输出独立展示",
		verdict: "通过（PASS）",
		rationale: "符合保守处理规则，不强猜归并",
		type: "pass",
	},
];

// 05 确认的问题与修复方向
export const defectFixMapping = [
	{ defect: "结构错误、超长、语音关联失效", fix: "输出约束、代码校验与降级逻辑" },
	{ defect: "事实被改写、关键条件丢失", fix: "生成提示词、证据约束与模型选择" },
	{ defect: "无关内容进入简报", fix: "白名单与相关性筛选规则" },
	{ defect: "项目错归或强行归并", fix: "项目关联线索与未知归属处理" },
	{ defect: "信息缺失、状态过旧", fix: "查询、同步与数据新鲜度机制" },
	{ defect: "内容合规但用户觉得无用", fix: "信息选择、篇幅分配与用户偏好" },
	{ defect: "Judge 判错", fix: "质检提示词与 Rubric 边界" },
];

// 06 Tier 3：用户价值验证——是否真正减负
export const userValueMetrics = [
	{
		metric: "有用性反馈",
		method: "收集“有帮助／部分有帮助／没帮助”，同时记录反馈覆盖率",
		boundary: "不把主动反馈用户等同于全部用户",
	},
	{
		metric: "反馈原因",
		method: "不准确、漏了重点、不相关、已知道、打扰、其他",
		boundary: "“漏了重点”需结合快照区分输入缺失与筛选遗漏",
	},
	{
		metric: "早期打断率",
		method: "播报开始后 3 秒内被打断次数 ÷ 有效播报次数",
		boundary: "区分停止与插话追问，不将所有打断视为负反馈",
	},
	{
		metric: "后续行动率",
		method: "交付后 1 分钟内发起相关执行指令的交付次数 ÷ 有效交付次数",
		boundary: "衡量行动衔接，不单独证明减负",
	},
	{
		metric: "主观减负反馈",
		method: "内测询问“是否更快明确今天先做什么”，结合案例访谈",
		boundary: "直接验证产品的核心目标",
	},
];

// 4. 归因定位分类：用户反馈“没帮助”后的 4 层分流定位
export const attributionTiers = [
	{
		category: "01 输入上下文缺失 (Input Defect)",
		symptom: "上游记忆缺失关键背景、未同步线下进展或状态已过期",
		routing: "单独回传上游记忆库排查，生成环节重点验证是否正确使用已有信息",
	},
	{
		category: "02 筛选规则偏离 (Filter Bias)",
		symptom: "模型挑选了陈年流水账或人设偏好，漏掉重要阻塞或到期承诺",
		routing: "优化上下文剪枝白名单与 Prompt 优先级权重定义",
	},
	{
		category: "03 生成事实错误 (Fact Hallucination)",
		symptom: "主体张冠李戴、篡改时间或凭空编造未达成承诺（幻觉）",
		routing: "强化 Prompt 事实约束，并在 LLM Judge 中建立原文 Force Quote 凭证",
	},
	{
		category: "04 时机与呈现不当 (Presentation Overload)",
		symptom: "语音口播过长引发打扰打断，或卡片信息混乱扫读成本高",
		routing: "前置代码门禁硬性限定口播 ≤25 字（单焦点播报），卡片通过 A2UI 结构化视图保障 5 秒即时扫读",
	},
];

// 5. 长期观测体系：4 大观测方向与信号用途
export const longTermObservations = [
	{
		dimension: "链路可靠性",
		signals: "满足触发条件后的询问与简报交付成功情况",
		purpose: "排查触发、生成和展示故障",
	},
	{
		dimension: "用户感知价值",
		signals: "有用性反馈、“不重要”“漏了重点”等原因",
		purpose: "调整筛选策略与个性化信息",
	},
	{
		dimension: "打扰与交互",
		signals: "明确拒绝、静音、打断及后续追问",
		purpose: "结合上下文判断提醒时机和语音负担",
	},
	{
		dimension: "内容纠错",
		signals: "事实错误、状态过期、重复提醒等反馈",
		purpose: "回流问题样本，补充回归检查",
	},
];

// 方案权衡决策 01：执行机制权衡（何时与如何计算）
export const executionDilemmas = [
	{
		code: "PATH 01",
		title: "现场 Agentic ReAct（原型验证）",
		approach: "用户上座后，模型自主多轮串行调用日程与待办工具。",
		advantage: "逻辑灵活，无需预设固定取数管道。",
		fatalPain: "串行耗时长达 30~40s 且步骤不稳定，无法满足早间即时扫读需求。",
		verdict: "多轮串行时延过长（30s+）",
		isAdopted: false,
	},
	{
		code: "PATH 02",
		title: "全量定时离线预生成（Cron 批处理）",
		approach: "每日清晨脱离用户状态，通过定时任务批量调模型生成静态简报。",
		advantage: "现场完全 0 延迟，用户上座后卡片秒开。",
		fatalPain: "未上座用户产生大量无效算力；且无法感知早间突发日程取消，内容易失效。",
		verdict: "算力空转，突发日程变更易失效",
		isAdopted: false,
	},
	{
		code: "PATH 03 (采用)",
		title: "触发即并发取数 + 模型单轮生成",
		approach:
			"用户上座触发瞬间，代码并发拉取实时日程与工作记忆（0.5s）；模型仅负责单轮提炼（3~4s）。",
		advantage: "数据 100% 实时且零无效算力；时延由 30s+ 压缩并稳定至 4~5s。",
		fatalPain: "需预设明确的字段契约，但换取了极高的执行确定性与秒级响应。",
		verdict: "确定性归代码，提炼性归模型",
		isAdopted: true,
	},
];

// 方案权衡决策 02：输入范围裁决（输入哪些上下文）
export const inputScopeDilemmas = [
	{
		code: "SCOPE A",
		title: "全量复用 LiveMem 通用记忆",
		approach: "直接复用系统按天沉淀的 32 类通用记忆（含日常闲聊、生活偏好）全量灌入 Prompt。",
		advantage: "直接复用既有模块，无需二次过滤。",
		fatalPain: "1.5万 Token 成本高昂，且琐碎闲聊严重掩没真正重要的工作卡点与承诺。",
		verdict: "全量高噪混杂，工作焦点被淹没",
		isAdopted: false,
	},
	{
		code: "SCOPE B (采用)",
		title: "场景化白名单剪枝 + 画像人际基准",
		approach:
			"基于底层按天更新的 LiveMem，在消费端设白名单仅放行工作承诺；保留画像基准阻断闲聊。",
		advantage: "记忆输入削减 92%（1.5万 → 1,200 Token），核心工作卡点信噪比大幅提升。",
		fatalPain: "引入两阶段流水线，增加了前置抽取与过滤的工程复杂度与状态管理成本。",
		verdict: "聚焦工作主线，记忆输入降至约 1,200",
		isAdopted: true,
	},
];

export const architecturalDilemmas = executionDilemmas;

// 长期记忆场景化剪枝矩阵：白名单核心工作与用户画像字段 vs 物理阻断闲聊偏好
export const kindProjectionMatrix = [
	{
		domain: "联系人记忆 (Person 域)",
		whitelist: [
			"person.commitment (承诺待办)",
			"relationship (人际协作背景)",
		],
		whitelistDesc: "他人承诺交付的待办，以及核心联系人协作关系（用于责任判定与主体对齐，识别谁是谁、该找谁催办）",
		blocked: [
			"profile (基本人设)",
			"preference (偏好风格)",
			"communication_style (沟通习惯)",
		],
		blockedDesc: "日常人设偏好与语气风格（仅适用于日常闲聊对话，晨报直接阻断）",
	},
	{
		domain: "用户自身记忆 (User 域)",
		whitelist: [
			"user.commitment (自身承诺)",
			"user.goal (核心主线)",
			"user.profile (画像与职能背景)",
		],
		whitelistDesc: "自身到期行动、主线目标，以及用户岗位与业务边界（作为噪音隔离与责任判定的基准锚点，用于识别哪些事项与本人直接相关）",
		blocked: [
			"habit (生活习惯)",
			"communication_style (偏好表格化汇报等)",
			"preference (个人爱好碎碎念)",
		],
		blockedDesc: "个人生活习惯偏好与日常碎碎念（晨间聚焦场景的纯粹干扰项）",
	},
	{
		domain: "项目协作记忆 (Project 域)",
		whitelist: [
			"project.blocker (阻塞卡点)",
			"project.risk (交付风险)",
			"project.next_step (行动计划)",
			"project.status (最新进展)",
			"project.decision (待决决策)",
		],
		whitelistDesc: "核心项目推进中的阻断卡点、延期风险、待决决策与关键行动",
		blocked: [
			"history (远期历史流水账)",
			"people_context (模糊背景信息)",
			"requirement (过往需求细节)",
		],
		blockedDesc: "远期项目流水账与陈年背景说明（对当天行动决策无增量价值）",
	},
];

// 4:1 样本分层评测集矩阵 (专注于 Daily Brief 真实场景)
export const sampleMatrix = [
	{
		type: "典型项目进展与承诺",
		ratio: "60%",
		count: "24 条",
		feature: "项目处于 Active/In-Progress 状态，且包含昨天下达的明确到期承诺",
		focus: "考察模型将承诺（Commitment）和下一步计划（Next-step）转化为今日待办的提取精度",
		badge: "核心抽取",
	},
	{
		type: "跨日阻塞与风险预警",
		ratio: "15%",
		count: "6 条",
		feature: "项目存在阻断级技术卡点（project.blocker）或待决关键决策",
		focus: "考察抗噪排序：能否将卡点与风险置于首位高亮，而非被常规进展流水账掩盖",
		badge: "优先级排序",
	},
	{
		type: "时钟门禁与动态日程过滤",
		ratio: "15%",
		count: "6 条",
		feature: "用户较晚到工位（如 10:30），输入包含上午已结束的日程与全天待办",
		focus: "考察时序门禁：能否基于当前时钟自动剪枝已结束会议，只聚焦剩余全天待办",
		badge: "时钟动态剪枝",
	},
	{
		type: "负样本 / 审慎降级",
		ratio: "10%",
		count: "4 条",
		feature: "近期无活跃项目变动、无承诺待办，仅有常规群聊闲聊",
		focus: "考察审慎性：主动说明今日无重大阻塞，严禁把闲聊八卦凑数编造成工作重点",
		badge: "防瞎编门禁",
	},
];

// 典型 Bad Case 评测质检清单（严格对齐 Gate 1 代码门禁与 Gate 2 D1—D3 三元裁决标准）
export const caseGtEnhanced = [
	{
		gate: "端到端 · 用户感知",
		dimension: "真实待办完整履约",
		rule: "今日到期承诺必须提醒，不得发生严重业务漏项",
		beforeVerdict: "FAIL",
		beforeReason: "真实漏事：表格翻译未提醒",
		afterVerdict: "PASS",
		afterReason: "精准召回：保活到期待办",
		quote: "多语言支持：今日到期：您需在周五前完成表格翻译",
		level: "端到端",
	},
	{
		gate: "Gate 2 · D2",
		dimension: "时间有效与时序过滤",
		rule: "对照输入核查事项时效；过滤历史失效与无关噪音",
		beforeVerdict: "PASS",
		beforeReason: "Judge盲区：输入缺失误判通过",
		afterVerdict: "PASS",
		afterReason: "输入补全：核验真实合规",
		quote: "输入快照核验无失效事项",
		level: "P0",
	},
	{
		gate: "Gate 2 · D3",
		dimension: "项目归并依据",
		rule: "事项依上下文关联归并；散碎待办按保守规则独立展示，不强猜",
		beforeVerdict: "PASS",
		beforeReason: "符合规则：散碎待办独立列出",
		afterVerdict: "PASS",
		afterReason: "符合规则：项目分流清晰",
		quote: "其他待办：18:00 前提交实习生日报",
		level: "P0",
	},
	{
		gate: "Gate 2 · D1",
		dimension: "事实保真 (Force Quote)",
		rule: "主体、时间、条件严格一致；必须提供输入原文定位依据",
		beforeVerdict: "PASS",
		beforeReason: "要素保真：时间与事项忠实",
		afterVerdict: "PASS",
		afterReason: "要素保真：时间与事项忠实",
		quote: "评测平台对齐：用例差异卡点待确认，今日 15:00 参加评审",
		level: "P0",
	},
	{
		gate: "Gate 1",
		dimension: "代码门禁（口播硬限）",
		rule: "语音口播严格 ≤25 字单焦点播报；A2UI JSON Schema 校验合规",
		beforeVerdict: "PASS",
		beforeReason: "口播 18 字（符合 ≤25 字硬限）",
		afterVerdict: "PASS",
		afterReason: "口播 20 字（符合 ≤25 字硬限）",
		quote: "口播提炼：“早！今天重点跟进多语言表格翻译。”",
		level: "门禁",
	},
];

// 03 归因方法：沿输入、生成与评测三个环节定位问题
export const attributionDirections = [
	{
		direction: "输入问题",
		basis: "对照上游记录、筛选日志与 InputBundle，确认是否缺失、过期或被误删",
		fix: "数据查询、记忆更新、筛选规则",
	},
	{
		direction: "生成问题",
		basis: "输入已有充分依据，但输出出现事实失真、噪音或项目错归",
		fix: "生成 Prompt、上下文组织与模型选择",
	},
	{
		direction: "评测问题",
		basis: "对照 Rubric 与原始证据，确认 Judge 是否误判，或规则是否存在歧义",
		fix: "Rubric 与 Judge Prompt",
	},
];

// 线上 5 维观测指标漏斗
export const onlineTelemetry = [
	{
		name: "物理插座触发率",
		target: "> 85%",
		desc: "手机插到底座后成功触发轻量询问的比例。衡量物理状态捕获的稳定性。",
		action: "< 80% 时排查底座传感器及端侧驱动事件",
	},
	{
		name: "负反馈打断率",
		target: "< 8%",
		desc: "语音播报开始 3 秒内被用户开口打断或静音的比例。直接反应语音信噪比。",
		action: "> 10% 时触发语音文案精炼度进一步降级",
	},
	{
		name: "卡片停留时长",
		target: "> 4 秒",
		desc: "桌面卡片呈现后的驻留时间，衡量三段式信息是否具备真实工作决策价值。",
		action: "识别低价值、无停留的无效推送",
	},
	{
		name: "追问转化率",
		target: "> 15%",
		desc: "简报交付后 1 分钟内，用户针对卡片内容发起执行指令（如‘催一下张三的文档’）。",
		action: "正向心智指标，验证是否真正实现 Mental Offload",
	},
	{
		name: "过期纠错率",
		target: "< 2%",
		desc: "用户因信息过期发起纠错（如‘那个项目早结案了’），用于监控 48h 时序窗口有效性。",
		action: "触发异常 Trace 回流校准集",
	},
];

// 数据飞轮流转步骤
export const flywheelSteps = [
	{
		step: "01",
		title: "无感异步脱敏落盘",
		detail:
			"内部日常真实 Dogfooding，在插座触发时异步镜像脱敏快照与最终生成结果，零侵入积累长尾 Case。",
	},
	{
		step: "02",
		title: "离线影子评测",
		detail: "脱敏数据定期在影子环境运行质检规则，基于 Force Quote 自动核查事实依据与规则违规项。",
	},
	{
		step: "03",
		title: "异常分歧自动聚类",
		detail:
			"针对两模型打分分歧、或触发打断的低体验 Trace，自动聚类归因为「时序失效」「承诺遗漏」「过度冗余」三类。",
	},
	{
		step: "04",
		title: "PM 周度精益归因",
		detail:
			"PM 每周仅需投入 1 小时复核 Top 3 典型争议 Case，定向微调剪枝规则并增量补充至 Golden Benchmark。",
	},
];

// 阶段成果与下一步规划
export const stageOutcomes = [
	{
		label: "取得了什么结果",
		detail:
			"实测端到端耗时稳定控制在约 4~5s（并发预查 + 单轮直出）；修复已发现的 48h 误切漏报并纳入回归库（当前回归集中未再重现同类遗漏）；严格守住语音口播 ≤25 字单焦点物理防线，卡片通过 A2UI 结构化呈现保障 5 秒即时扫读。",
		type: "result",
	},
	{
		label: "还有什么没验证",
		detail:
			"目前主要完成自身深度内测与内部种子用户的日常 Dogfooding。面对不同职能岗位（如咨询、商务、运营）的多样化工作节奏，主动推送是否能在多用户场景下稳定实现心理减负（Mental Offload），仍需长周期验证。",
		type: "unverified",
	},
	{
		label: "下一步优先做什么",
		detail:
			"推进长期线上持续观测（结合打断率、停留时长等行为指标），持续收集真实场景中的长尾 Bad Case，闭环驱动上游数据供给与时序剪枝规则迭代。",
		type: "next",
	},
];
