# 作品集案例页 · 统一版式与写作规范（所有 Agent 必读）

站点：Astro + Tailwind v4，视觉语言复刻 astro-aria（细虚线边框、等宽小标签、中性灰 + 单一强调色）。
样式已在 `src/styles/global.css` 第二个 `@layer components`（aria overrides）中定义，**不要新增 CSS，不要写 `<style>` 块，不要改 tailwind.config**。只用下面列出的 class + 基础 Tailwind 工具类。

---

## 1. 页面骨架（精选项目一律用 CaseStudy 布局）

```astro
---
import CaseStudy from "@/layouts/CaseStudy.astro";
---

<CaseStudy
	title="项目名"
	description="SEO 描述，一句话。"
	eyebrow="Flagship case · 2026"
	intro="一句话介绍：这个项目帮谁解决了什么问题，我做了什么。2–3 行。"
	tags={["标签1", "标签2", "标签3", "标签4"]}
	results={[
		{ value: "80%", label: "草稿直接采纳率", note: "试点期间 · 3 类场景" },
		{ value: "40%↑", label: "人均工单处理效率", note: "试点客服组" },
	]}
	scope="数据口径：2026.08 起试点，样本为 XX；未上线部分标注为离线评测。"
	meta={[
		{ label: "项目性质", value: "实习项目 / 公司 AI 赋能专项" },
		{ label: "我的角色", value: "产品负责人" },
		{ label: "周期", value: "2026.08 — 至今" },
		{ label: "阶段", value: "小范围试点" },
		{ label: "协作", value: "售后专家 / 算法 / 研发" },
		{ label: "说明", value: "业务信息已脱敏" },
	]}
>
	<section class="case-section">
		<div><p class="number-label">01 / PROBLEM</p><h2>小节标题（结论式，不是名词）</h2></div>
		<div class="case-copy">
			<p class="case-lede">每节第一句必须是结论，加粗语义由样式承担。</p>
			<p>证据、数据、流程说明…</p>
			<div class="judgment">
				<p class="judgment__label">我的判断</p>
				<p>为什么这么选、接受了什么代价。</p>
			</div>
		</div>
	</section>
</CaseStudy>
```

`meta` 固定 5–6 行。公司项目页用归属六行：公司项目 / 项目时间 / 担任角色 / 负责范围 / 协作对象 / 项目状态（先交代产品归属，再讲个人贡献）；其他页可用：项目性质 / 我的角色 / 周期 / 阶段 / 协作 / 说明。
`results` 放 2–4 个，与简历 bullet 一一对应（CaseStudy 布局按数量自适应 2 / 3 / 4 列）；**必须配 `scope` 说明验证范围与口径**。

---

## 2. 可用组件 class 清单（严格照抄结构）

| 用途 | 结构 |
|---|---|
| 章节 | `<section class="case-section"><div><p class="number-label">01 / XXX</p><h2>…</h2></div><div class="case-copy">…</div></section>` |
| 结论句（每节首句） | `<p class="case-lede">…</p>` |
| 我的判断 | `<div class="judgment"><p class="judgment__label">我的判断</p><p>…</p></div>` |
| 关键取舍卡 | 见下方「取舍卡模板」 |
| 链路 / 流程 | `<div class="flow"><div class="flow__step"><span>STEP 01</span><b>名称</b><small>说明</small></div><div class="flow__arrow">→</div>…</div>`；人工确认 / 门禁节点加 `flow__step--gate` |
| 编号卡片网格 | `<div class="tile-grid"><div class="tile"><p class="tile__index">01</p><b>标题</b><p>说明</p></div>…</div>` |
| 做 / 不做（MVP 边界） | `<div class="scope"><div class="scope__col scope__col--in"><p class="scope__title">本次做</p><ul><li>…</li></ul></div><div class="scope__col scope__col--out"><p class="scope__title">明确不做</p><ul><li>…</li></ul></div></div>` |
| 数据表 | `<table class="data-table"><caption>表标题</caption><thead><tr><th>…</th></tr></thead><tbody><tr><td>…</td><td class="num">80%</td></tr></tbody></table>` |
| 三个指标 | `<div class="stat-row"><div class="metric"><strong class="font-mono text-3xl">91%</strong><p class="muted text-sm">记忆准确率</p></div>…</div>` |
| 核心结果卡（布局内置，勿手写） | 由 `results` / `scope` / `meta` prop 渲染：`case-results` 卡（`case-results__head` + `metric-tile`：`metric-tile__index` 序号 / `strong` 数值 / `p` 名称 / `metric-tile__note` 口径注）+ `case-results__scope`；`meta` 渲染为三列信息条 `case-meta` |
| 图片 / 图示 | `<figure class="figure"><img src="/portfolio/xxx.png" alt="…" loading="lazy" /><figcaption>图 1 · 说明</figcaption></figure>` |
| 标签行 | `<div class="chip-row"><span class="chip">MCP</span>…</div>` |
| 视频 | `import LoopVideo from "@/components/LoopVideo.astro";` → `<LoopVideo label="…" poster="/portfolio/x.png" src="/portfolio/x.mp4" />` |
| 按钮 / 链接 | `<a class="button-primary" href="…" target="_blank">查看 GitHub ↗</a>`、`<a class="button-ghost" …>`、行内链接 `<a class="cactus-link" …>` |
| 强调 | 正文用 `<strong>`；次要说明用 `<p class="muted mt-7">…</p>` |

**取舍卡模板（AI 项目必备，2–3 张）：**

```astro
<div class="decision">
	<div class="decision__head">
		<span class="decision__index">取舍 01</span>
		<span class="decision__title">先做「生成草稿 + 人工确认」，不做自动回复</span>
	</div>
	<dl class="decision__rows">
		<div class="decision__row"><dt>约束</dt><dd>政策例外多、错答会直接触达海外客户。</dd></div>
		<div class="decision__row"><dt>候选方案</dt><dd>A 全自动回复；B 草稿 + 人工确认；C 只做检索不生成。</dd></div>
		<div class="decision__row"><dt>证据</dt><dd>离线评测中政策例外场景漏限制条件比例较高。</dd></div>
		<div class="decision__row"><dt>选择</dt><dd><em>B</em>：把引用溯源、编辑与反馈入口纳入 MVP。</dd></div>
		<div class="decision__row"><dt>代价</dt><dd>单封邮件仍需人工点击，效率收益低于全自动。</dd></div>
	</dl>
</div>
```

---

## 3. 写作规则（硬性）

1. **结论 + 证据 + 我的判断**：每节先 `case-lede` 给结论，再放一组数据/表/图，最后用 `judgment` 写判断。禁止流水账、禁止按时间堆工作内容。
2. **AI 项目必须讲清 4 件事**：① AI 的必要性（规则/搜索为什么不够）；② 2–3 个关键取舍（用取舍卡句式：约束→候选→证据→选择→代价）；③ 不确定性处理（信息不足如何追问、无依据如何拒答、执行前如何确认、失败如何转人工）；④ 效果验证（用户价值 / AI 质量 / 运行约束三层指标，注明样本量或周期）。
3. **不许编造**：只能用下面「事实来源」里的数字与结论。没有的数字一律不写；没有真实上线数据的写「离线评测」「原型测试」「试点期间」。禁止虚构用户规模、商业收入、模型榜单成绩。
4. **保密**：不出现内网/localhost/私有仓库地址；公司数据脱敏（可写比例与区间，不写绝对营收、客户名）。
5. 中文排版：中英文之间加空格，数字与单位之间加空格（如 `40% ↑`、`213 个 Case`、`≈60% ↓`、`约 72% → 96%`）；标点用中文全角，代码/字段名用英文。**引号一律用「」（不用 “” 与 ASCII 直引号）**。本文件模板里出现的 `40%↑` 属笔误，以本条规则为准。
6. 篇幅：每页 4–7 个 `case-section`；公司项目页推荐四段式：01 背景与职责 / 02 问题与取舍 / 03 设计与落地 / 04 验证与复盘。正文中文字数上限：精选案例（projects/）≤ 2400 字，practice 页 ≤ 1500 字；下限 900 字。不要注水，重复表述必须合并。
7. 章节 `number-label` 用 `01 / PROBLEM` 这种「两位数字 + 英文大写关键词」格式。
8. 只写你被指派的那个文件，**不要动其他文件**（首页、projects/index、CSS、layout 都归主线程）。

---

## 4. 事实来源（唯一可用素材）

### 4.1 最新定稿简历原文（2026-09-29 定稿版）

> 本节以定稿简历为唯一简历口径。

**赵泽宇**｜27 届硕士（毕业时间：2027年3月）｜求职意向：AI 产品经理｜作品集 github.com/Zhaozed

> **27 届海外软件工程硕士**，专注于 **Agent 产品设计**与体验优化，善于结合业务诉求与模型边界设计可行方案，把控系统容错与确定性交付；坚持以**评测驱动**效果迭代，能凭借开发能力独立完成从方案设计、原型验证到工具落地的**全流程闭环**。

教育：Universiti Malaya（QS 56）软件工程 硕士 2024.03–2027.03；河北经贸大学 软件工程 本科 2019.09–2023.06。

**可以科技（KEYi，具身 AI 硬件厂商）｜AI 产品经理（实习）2026.05 – 至今**

**Cortex-Agent｜桌面具身 Agent　2026.05—至今**
可以科技 Loona 桌面机器人的 Agent 运行时，面向办公辅助与陪伴场景，支持语音交互与主动任务执行；基于 ReAct 架构完成任务路由、规划、工具编排与输出门控。
- 工具治理与效果优化：针对 122 个工具全量注入引发的上下文膨胀与模型误选，主导设计「同类能力聚合＋业务域路由＋按需动态挂载」分层调度方案，推动 ToolHub 目录精简至 77 个；在基准评测集下，Planner 单轮输入 Token 降低约 30%，基准用例成功率由 91.2% 提升至 97.8%（124 → 133/136）。
- 主动服务设计与闭环：主导晨间智能简报（Daily Brief）主动服务落地；针对现场多轮 ReAct 等待过长痛点，设计“并发预查＋场景化记忆过滤”方案，将端到端时延压至 4~5s；通过建立“门禁·质检·验证”三层闭环，持续收敛 Bad Case，保障晨报核心信息的准确生成。
- 办公能力接入与标准化：负责 Gmail、Outlook 邮件／日程等 5 项核心办公工具的功能设计与交付，确立“高危操作必确认、缺参必反问”等交互防错红线；沉淀覆盖场景标准、权限边界与异常兜底的 6 步标准接入 SOP，并将接入规范封装为可复用的 PRD Skill。

**Cortex-Eval｜Cortex-Agent 评测与版本验收平台（0—1）　github.com/Zhaozed/cortex-eval　2026.06—2026.08**
为 Cortex-Agent 配套建设的评测与版本验收平台，解决人工走查效率低、执行过程检查不足及存量能力回归难等问题；主导产品规划、评测体系设计与平台落地。
- 产品规划与平台交付：拆解 Langfuse、Promptfoo 差异与边界，结合 Cortex 接口定义核心模块；基于 Codex 独立完成平台交付，落地多环境批跑、版本对比、A2UI 渲染及 Trace 归因诊断。
- 评测规范与资产建设：建立覆盖路由、工具编排、发声与安全等 6 维评测矩阵；围绕日程、邮件等 9 类核心场景，沉淀 30+ 项检查规则与回归基线；结合 JEV、代码断言和 LLM 裁判，分别核验结构化规则、确定性要求与开放语义，识别存量能力退化。
- 综合成果：建立起“评测发现—归因修复—复测验证—回归集更新”的质量闭环；累计支撑 3 次版本验收，识别并推动解决 5 个阻塞级问题，单轮走查周期缩短约 60%。

**九号公司（零极创新事业部）｜前端研发（实习）2025.07 – 2026.01**
- B 端研发交付与全栈协作：围绕消息推送、设备数据看板等业务场景，参与需求评审，负责 RBAC 权限控制、复杂表单与长列表优化等前端交付；协同后端、测试完成全流程联调验收，独立交付 10+ 项需求、闭环 15+ 个缺陷，沉淀扎实的工程实现与产研协同底色。

**个人项目：DayMate｜桌面端AI 待办与求职助手（独立全栈开发 · 开源） github.com/Zhaozed/DayMate 2026.02 - 2026.04**
针对海外求学（毕业进度、导师沟通）及校招求职信息分散多处的痛点，独立开发AI 邮件待办与求职助手，将邮件非结构化内容自动转化为待办清单、求职进展看板与面试资料。已自用并开源。
- 人机协同（HITL）防错：针对多岗位同公司场景设计分级匹配，无法唯一确定时不盲目归并，转由人工确认；缺失 JD 等关键信息时兜底保留基础待办，挂起深度生成并引导补全，坚决杜绝记录串线与无据脑补。
- Workflow 设计：设计串联企业调研、岗位匹配与考点梳理的自动化工作流；基于设定的 HTML 模板约束输出形态，强制模型仅依据客观事实与简历生成准备资料，杜绝无据幻觉，累计支撑自身 6 场求职面试备战。

技能：AI 产品设计（Prompt Engineering、Agent 方案设计与评测体系搭建，任务路由、工具调用与人机协同机制，LLM Judge 评分标准与版本验收规则）；AI 工具应用（Codex、Claude Code，封装为团队可复用的 Skill）；开发与数据（JavaScript / TypeScript 及前端生态，快速搭建原型；Python、SQL 数据处理与分析）；英语（PTE Academic 64 分，等价雅思 6.5）。

> 新版简历已删除「售后邮件 AI 助手」项目与 80% 采纳率 / 40% 效率数据；站点上对应页面已下线，**不得再新建该案例页或引用这些数字**。飞书翻译机器人只剩一句话概述，practice/translator 页只能用 §4.5 工作流 JSON 里的结构性事实。

### 4.2 Cortex 架构补充（材料/01-agent-cortex/ReAct架构.md）

Cortex 是基于 ReAct 架构的分布式 Agent Runtime，负责准入、路由、规划、工具编排、上下文管理与流式输出控制。主要解决五类问题：多入口请求统一接入与幂等落库；同一用户多条请求分流到 `CHAT / NO_MEANING / NEW / EXISTING`；任务执行中安全调用工具、等待结果、确认危险操作并支持打断；多窗口多设备多实例下输出顺序与可见性一致；实例崩溃、租约过期、路由未定案或文本未发出时自动补位自愈。
请求类型：`REQ`（主链路）、`UI_ACTION`（转 REQ）、`TOOL_RESULT`（本地工具回流）、`ONLINE/OFFLINE`（在线态）、`FACE`（人脸事实）。
核心机制：意图与目标解析；规则短路（高频固定表达走 `quick_router` / `quick_plan` 降低 LLM 成本与波动）；`THINK → CALL_TOOL / ASK_USER / DONE` 循环；本地/在线/危险工具确认/静默衍生工具；统一控制 `NOTICE / QUESTION / TOOL_CALL / TOOL_EVENT / ROUTER_RESP` 发出时机与顺序；短期上下文与长期偏好记忆。
历史数据（可用，注明为治理前后对照）：ToolHub 工具数 122 → 77（36.9%↓）；LiveMem 记忆准确率 91%，Mail Draft 个性化采纳率 43% → 71%，检索工具调用次数下降 31%（3 轮内测迭代）。
> 注意：LiveMem 在最新简历里已不作为主线，**DeskMate 页最多用一小节带过或不写**；不得把 LiveMem 说成独立上线产品。

### 4.3 工具接入 SOP（github.com/Zhaozed/Loona-PMdevelopskill，公开仓库）

SOP 六步：场景与任务成功标准 → API 能力与交互映射 → 权限、隐私与危险操作 → 失败、空结果与人工兜底 → 测试用例与评测验收 → 上线后 Badcase 回流。复用于 10+ 个工具需求，并沉淀为可复用的产品设计 Skill。

### 4.4 DayMate（材料/02-daymate/DayMate.md，个人项目，github.com/Zhaozed/DayMate）

macOS 桌面应用；针对海外求学与国内求职信息分散、关键节点易遗漏；常驻桌面的个人工作代理，把非结构化邮件转化为必读清单、可跟进待办与求职档案，覆盖邮件分类、晨报生成、求职追踪等 6 项核心任务；独立完成产品定义、全栈开发与评测闭环。
评测：为各核心任务定义可量化成功标准，功能测试集 + 跨功能回归集，62 条回归用例、5 类 badcase，作为 GitHub 提交前质量门禁；用 Langfuse 管理测试集、Rubric 与评测结果。
数据飞轮：用量数据定位并退役冗余例程，消除单日 30+ 次无效调用；重构信息过滤门控，必读噪音 27 条 → 1 条；邮件分类准确率约 72% → 96%。
状态：本人真实邮箱环境自用，Gmail 与 163 已接入，飞书日历保留配置入口；未商业化、无外部用户规模数据。
可复用素材：视频 `/portfolio/daymate/home-demo.mp4`（poster `home.png`）、`application-demo.mp4`（`applications.png`）、`memory-demo.mp4`（`memory.png`），图片 `inbox.png`、`settings.png`。

> 状态更新（2026-09-19）：按最新简历，ServiceAtlas（海外售后邮件 AI 助手）案例页已从作品集下线，仅保留 DeskMate（现名 Cortex-Agent）与 Cortex-Eval 两个主项目。本节材料保留作归档，不再用于站点内容。

### 4.5 ServiceAtlas 真实工作流（`材料/07-service-atlas/ServiceAtlas-Full-Workflow.json`，桌面导出的 n8n 工作流，49 个节点）

**这是售后邮件 AI 助手页的第二事实来源，与 4.1 简历原文同等有效。** 已逐字核验，可直接引用：

- 工作流名：`ServiceAtlas · 售后邮件处理`；编排工具 **n8n**；数据落 **PostgreSQL**（`serviceatlas.drafts` 表）；邮件入口 **Gmail 触发器 + 首次历史批量导入**；审核通知走 **飞书机器人**；定时任务负责「重试待处理任务」。
- 链路节点顺序（真实）：`Gmail 新邮件 → 邮件入库与任务领取 → 展开任务/逐封处理 → 整理历史与当前邮件 → 检查上下文完整性 → 邮件分类（LLM）→ 解析分类/记录分流决定 → 进入查证拟稿 → Agent 查证与回复拟稿（ToolHub MCP，只读工具）→ 校验草稿与保留证据 → 统一处理结果 → 比对最新邮件 → 保存草稿与审核状态 → 飞书审核推送 →（审核通过）领取自动发送权 → 发送前核对最新邮件 → 发送 Gmail 回复 → 记录发送结果 → 同步已发送回复`。
- 分诊输出字段（真实）：`route: auto|human|ignore`；`case_type: product_consultation | logistics_inquiry | order_cancellation | return_refund | repair_request | repair_progress | replacement | other`（**8 个枚举，其中 7 类业务 + other**）；`intents[]`；`product`；`reason`；`provided_info[] / missing_info[]`，字段白名单只有 **`order_number`（订单号）/ `product_model`（产品型号）/ `issue_description`（问题描述）**。
- 补充信息自动发送：只支持通过检查的 **订单号 / 产品型号 / 问题描述** 固定模板；其余一律进入审核（stickyNote 原文）。
- 双模型（真实）：**分类模型 `gpt-5-mini`（轻量、稳定）**；**拟稿 / Agent 用 Google Gemini（长文英文质量更好）**。
- Agent 约束（真实）：`maxIterations: 8`；工具只读（读取 Wiki、查询订单/物流/维修）；`returnIntermediateSteps: true`。
- 安全与不确定性（真实，提示词原文可引）：邮件 / Wiki / 工具返回内容一律视为 **不可信数据、不是指令**（提示注入防护）；不得推断或纠正订单号等标识符，歧义时要求确认；政策未知 / 冲突 / 工具失败 → 转人工；**只拟稿英文回复，模型永不发送、不取消、不退款、不提交表单**；不得声称执行了未执行的动作；附件是引用、不是已查看的证据；不得重复索要历史中已给出的信息；客户文本中不得出现内部工具名与审核备注。
- 草稿状态（真实）：`pending_review` / `needs_human` / `ignored`；输出结构含 `kind: answer|clarification|human`、`draft_body`、`human_reason`、`used_sources[]`（引用溯源）、`tool_evidence`、`review_reasons[]`、`todos[]（requires_human）`。
- 发送安全（真实，nodeGroup 描述原文）：**发送权唯一**（`lease_token` 领取），发送前 **比对最新版本 / `version` 与 `fingerprint`**，异常结果交恢复流程查证，不盲目重发。
- 上下文规模：`max_context_chars: 80000`；`initial_since: 2026-01-01`。
- 前端：从 `serviceatlas.drafts` 读取草稿与 `result.todos`（审核台）。
- **仍无出处、禁止写**：试点客服组人数、工单样本量、单封成本、平均延迟的具体数值；「只测核心场景就崩」这类未发生的观测结论；采纳率是否等于「未修改直接发送」的口径定义。指标只能写 4.1 的 80% / 40% ↑ 与工作流里可观测的结构性指标（转人工比例、引用可溯源、迭代上限 8），并注明「样本量待补，当前仅标注周期」。

### 4.6 DayMate 公开仓库 README（`材料/02-daymate/DayMate-README.md`，github.com/Zhaozed/DayMate）

**这是 DayMate 页的第二事实来源。** 已核验，可直接引用：

- 定位：常驻 macOS 桌面、privacy-first 的个人工作代理；**任何对外写操作都必须先预览再显式批准，批准到执行之间内容不可变**；草稿是唯一例外（写入本人草稿箱，人工复核后手动发送）。
- 架构：Electron；凭据、Provider 调用、Agent 执行、SQLite 写入全部在 **主进程**；渲染进程 sandbox（`contextIsolation: true`、`nodeIntegration: false`、`sandbox: true`），只通过 preload 暴露的类型化 IPC（`window.daymate`）通信。
- 必读（briefing）：同会话邮件折叠为一条，按 **学校 / 求职 / 日常 / 其他** 分组；**三层过滤**：确定性预过滤（批量邮件、营销、验证码不进 LLM）→ LLM 分类 → `important || actionable` 出口门控。
- 首页三卡：**今日天气（wttr.in 实时 + LLM 润色建议，按日缓存）**、近一周晨报轮播、待办清单；邮件待办（`todoTitle` / `dueDate`）在已运行的分类器内抽取，**零额外 LLM 调用**。
- 投递（求职漏斗）：申请与事件时间线 **投递 → 测评 → 笔试 → 面试 → offer → 复盘**；新申请由来信推断，带 **置信门控（低置信停留 pending，不自动建档）**；含复盘看板（KPI 卡、漏斗条、来源环图）与 AI 复盘动作。
- Agent 与安全：`@earendil-works/pi-agent-core` 运行时 + Tool Registry；Zod 结构化输出二次校验；提示注入加固（`enforceTrust` 剥离不可信来源字段）；§15 审批门。
- 真实集成：Gmail（OAuth 2.0 loopback、token 存 Keychain）、163 邮箱（IMAP 读 + SMTP 发，授权码）、飞书日历（骨架，配置凭据后启用）。
- 质量工程：`pnpm typecheck / lint（零告警）/ test（Vitest 单测+集成）/ test:e2e（Playwright）/ dist（arm64+x64 通用包）`；里程碑与变更以 ADR 记录（`docs/decisions/` 0001–0029）。
- 发布：**GitHub Releases 有已发布的 universal `.dmg`**（仓库 200、release 数 = 1，已核验，可放下载按钮）；应用暂未签名，需一次性 Gatekeeper 步骤。
- 状态：M0–M5 与 ADR 0029 前的扩展均完成，本人自托管使用；Gmail + 163 已启用真实 Provider。
- 技术栈：Electron · electron-vite · React + TypeScript · Tailwind v4 · Zod · SQLite + Drizzle · node-cron · Gmail API · IMAP/SMTP · Feishu OpenAPI。
- **仍无出处、禁止写**：外部用户数、下载量、任何商业化数据。

### 4.7 事实来源优先级与已裁定项

1. 优先级：4.1 简历原文 = 4.5 工作流 JSON = 4.6 仓库 README > 4.2/4.3/4.4 材料摘录。**不得引用本文件以外来源**，需要新事实先由主线程补进本文件。
2. 已裁定：DeskMate **不写「已上线」**，口径为「Kickstarter 众筹完成（超 70 万美元，产品整体成绩）」+「SOP 已落地复用、Skill 已公开」。
3. 已裁定：`采纳率 43% → 71%` 属 **Mail Draft 个性化采纳率**，不得挂到 LiveMem 行；LiveMem 只有「记忆准确率 91%」「检索工具调用次数 ↓ 31%」，且必须标注「3 轮内测，非上线能力」。
4. 已裁定：Cortex-Eval 协作为 **独立完成信息架构与评测工作流设计**（不得虚构算法/测试同事）；`github.com/Zhaozed/cortex-eval` 为**公开仓库**（已核验 200），保密表述统一为「平台代码已开源，原始评测数据与 Case 内容不公开」。
5. 已裁定：ToolHub 治理动作只有 **同类能力聚合** 与 **业务域动态召回（全量注入 → 按需加载）** 两项；`122 → 77（≈36.9% ↓）` 之外的分组数量分布一律不写（图示中不得出现编造的分组计数）。
6. 已裁定：DeskMate 协作写 **研发**（spec 仅「协同研发」）；SOP 六步中「权限、隐私与危险操作」「失败、空结果与人工兜底」为必填项，表述为「我按必填项验收」，不写「缺一不进入评审」。
7. 已裁定：三层指标（用户价值 / AI 质量 / 运行约束）在 `stat-row` 的 `muted` 说明里必须带层名前缀；缺样本量处明写「样本量待补，当前仅标注周期」。
8. 已裁定（2026-09-21，以 09-19 版简历 PDF 为准）：办公工具能力为 **Gmail、Outlook 邮件／日程等 5 项**，不是「Notion 等 9 项」；ToolHub **Planner 单轮输入 Token ≈30% ↓**，不是「约 40%」。全站出现 9 项 / 40% 一律按此改。
9. 已裁定：工具治理动作为 **同类能力聚合 + 业务域路由 + 按需动态召回**（三项，新版简历原文），表述为「主导设计」，并推动 ToolHub 全量注入 → 按需加载、工具数 122 → 77。
10. 已裁定：评审工作台（可播放交互工作台）**无「支撑 10+ 需求评审」出处，禁止写该数字**；只写「链路动态演示 + 关键帧讨论/批注 + 理想链路导出 JSON」「Mock 评审工具，非产品代码，沉淀为可复用产品设计资产」。如需评审次数，先由本人补进本节。
11. 已裁定：Cortex-Agent 页四条个人贡献线固定为 **工具治理与效果优化 / 主动服务设计与迭代 / 办公能力接入与标准化 / 评审工具建设**，`results` 四张卡与之一一对应；页面结构用四段式 **01 CONTEXT / 02 DECISION / 03 DESIGN / 04 VERIFY**（背景与职责 / 问题与取舍 / 设计与落地 / 验证与复盘），归属信息用 `meta` 六行。
12. 已裁定：`46 条场景用例`、`5 轮 Bad Case 迭代`、`9 大核心场景` 只见于 09-16 旧版简历，新版已删；**46 条用例与 5 轮迭代可继续用**（口径标注「离线场景用例评测」），`9 大核心场景` 一律不写，改用「Mental Offload 主动服务体系 / 会议、工作汇报两类主动服务」。
