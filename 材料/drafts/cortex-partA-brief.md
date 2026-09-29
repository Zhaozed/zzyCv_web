# Cortex-Agent 页面重构 · 写作简报（所有子 Agent 必读）

站点：Astro + Tailwind v4，视觉语言 astro-aria。目标文件：`src/pages/projects/cortex-agent.astro`（由主线程整合，子 Agent 只写自己被指派的产物）。

---

## 一、PART A｜页面正文与内容位置（用户原话，权威结构，必须照此重构）

页面定位：AI 产品经理求职作品集中的单个公司项目详情页。
页面主线：围绕 Agent 的办公能力建设，展示工具治理、主动服务设计与评测迭代，并以交付工具证明落地能力。

### 01｜项目概览
- 标签：可以科技 KEYi · 实习项目
- 主标题：Cortex-Agent；副标题：Loona 桌面具身 Agent
- 项目介绍：面向办公辅助与日常陪伴场景，通过语音交互、任务规划与工具调用，连接邮件、日程等办公能力，并提供会议、工作汇报等主动服务。
- 我的职责：负责 ToolHub 工具治理方案、会议与工作汇报主动服务设计，以及办公能力接入与验收；建设 PRD 生成 Skill 和交互评审工作台，支持需求交付与团队协作。
- 基础信息：时间 2026.04—至今；角色 AI 产品经理实习生；协作 产品负责人、研发
- 三个结果摘要：
  1. `≈30% ↓` Planner 单轮输入 Token（治理前后对照评测）
  2. `+4 个百分点` 端到端任务成功率（治理前后对照评测）
  3. `60% → 87%` 主动服务关键事项覆盖率（46 条用例 · 离线评测）
- 产品素材位置：一张办公场景图或一段短交互视频；图注「Loona 办公交互示例｜［实际演示场景］」
- 页内导航：工具治理 / 主动服务 / 交付资产

### 02｜重点案例：ToolHub 工具治理
- 模块标题：工具增长后，如何控制上下文开销与误选风险？
- 问题：工具数量增长至 122 个；全量注入使 Planner 承担大量工具描述开销；不同平台同类能力重复表达，增加工具选择复杂度。
- 我的设计：主导同类能力聚合、业务域路由与按需加载方案设计，协同研发推动 ToolHub 从全量注入转为按任务加载。
- 图 1：ToolHub 治理前后对比 —— 此处嵌入 Archify 生成的 HTML 图（主线程负责嵌入，写 `<!-- SLOT:DIAGRAM-TOOLHUB -->`）
- 图下两项设计说明：
  - 能力聚合：按业务语义组织同类能力，减少重复定义；保留平台选择与必要差异，避免统一入口掩盖执行约束。
  - 按需加载：根据任务识别所需业务域，再加载相关工具 Schema；缩小 Planner 的工具范围，同时关注跨域任务是否漏召回。
- 设计判断：聚合处理「同类能力重复」，动态加载处理「当前任务无关」。两者需要配合，也需要分别检查：工具是否选对、所需能力是否完整、执行结果是否符合预期。
- 验证与结果：治理前后对照评测，同时检查上下文开销与端到端任务完成情况。工具数量 122 → 77；Planner 单轮输入 Token 约下降 30%；端到端任务成功率提升约 4 个百分点。
- 折叠入口「查看评测口径与一个工具聚合示例」，展开内容 4 条：① 对照评测使用的版本、样本量与场景范围；② 任务成功的判定方式；③ Token 的统计范围与聚合方式；④ 一项真实能力的聚合前后对照（原有工具 → 聚合能力 → 保留的平台差异）。→ 以上均需补齐真实材料后展示（当前无材料，按「待补」占位，不得编造）。

### 03｜重点案例：会议与工作汇报主动服务
- 模块标题：如何让主动服务覆盖用户需要关注的事项？
- 场景与职责：会议准备与工作汇报需要用户整理分散信息。我参与 Mental Offload 主动服务体系设计，主导这两类场景的需求定义、方案设计与验收，将场景所需内容转化为可检查的输出要求。
- 产品设计：围绕每类场景明确服务触发条件、信息范围、内容结构和后续操作，并将关键事项纳入验收，检查内容是否遗漏、失真或偏离当前任务。
- 交互示例：默认展示一类素材完整的场景（例如会议简报）。使用情境［一句话］；服务目标［一句话］；此处放真实脱敏交互截图或重绘交互示意；图下只保留两项说明：内容安排［实际如何组织与排序］、用户操作［实际支持的查看、追问或其他动作］。另一类场景通过「查看工作汇报示例」展开，不在默认页面重复铺开。
- 评测方法：围绕场景用例标注应覆盖的关键事项，逐项比对实际输出，定位遗漏并验证修改效果。关键事项覆盖率衡量内容完整性，同时检查事实是否与输入一致、有无无依据新增。
- 一条代表性迭代 —— 此处嵌入 Archify 生成的 HTML 案例对照（主线程负责，写 `<!-- SLOT:DIAGRAM-ITERATION -->`）；四块内容：场景输入与 GT［输入摘要和应覆盖事项］／迭代前［输出节选及遗漏标注］／原因与改动［实际归因结论 + 具体调整内容］／迭代后［输出节选与复测结论］。→ 该案例需真实记录，暂无材料时保留为开发待办，不编写虚构结论。
- 验证结果：46 条场景用例、5 轮 Bad Case 迭代，关键事项覆盖率 60% → 87%。
- 简短范围说明：该指标反映评测样本中的内容覆盖效果，用户实际有用率与推送时机效果需另外验证。
- 折叠入口「查看标注与评测口径」：GT 依据什么信息建立；关键事项如何标注与审核；怎样判定正确覆盖；总体覆盖率如何计算；前后样本、输入及规则是否一致。若 GT 基于本次提供给 Agent 的记忆或上下文，明确评测范围为「对可用输入的组织与覆盖」，不延伸到上游信息提取质量。

### 04｜交付资产：支持需求复用与交互评审
- 模块标题：将接入与评审经验沉淀为团队可复用的工具
- 资产一「办公能力接入与 PRD 生成 Skill」：负责 Gmail、Outlook 邮件／日程等 5 项办公能力的需求定义、功能设计与验收；将接口调研、交互规则、异常分支及验收要求沉淀为 PRD 生成 Skill，支持后续同类需求复用。证据：默认展示一份 PRD 的清晰局部预览，突出「异常处理」和「验收要求」。入口：查看 PRD 示例（无素材→待补占位）、查看 Skill → https://github.com/Zhaozed/Loona-PMdevelopskill
- 资产二「Agent 交互评审工作台」：搭建基于预设 Case 的交互评审工作台，按事件播放用户输入、Agent 状态、语音与卡片呈现，支持关键帧批注及理想链路导出，帮助团队对齐交互时序。证据：工作台视频封面，点击播放 20—30 秒演示；封面图注「Mock 交互评审工作台｜预设 Case 演示」。入口：播放演示。
- 注意：这里重点展示工具如何支撑工作，不重复展开完整背景、方案、结果。

### 05｜项目复盘
- 复盘一：工具治理需要兼顾上下文成本与能力完整性。按需加载减少无关信息，也引入召回环节，因此需同时验证成本、漏召回与最终任务完成情况。
- 复盘二：主动服务需要分别验证内容质量与用户价值。关键事项覆盖率帮助定位遗漏，推送时机、打扰程度和实际有用性仍需其他证据补充。
- 页面结束：返回精选项目（布局自带 backHref）

---

## 二、硬性写作规则（违反即返工）

1. 不许编造。只能使用第三节「已裁定事实」里的数字与结论；没有材料的位置一律写成「待补素材 / TODO」占位块或 HTML 注释，禁止虚构截图说明、归因结论、样本量、版本口径。
2. 只使用下面列出的 class + 基础 Tailwind 工具类。**不要新增 CSS、不要写 `<style>`、不要改 tailwind.config、不要动 global.css / CaseStudy.astro / 其他页面。**
3. 中文排版：中英文之间空格、数字与单位之间空格（`≈30% ↓`、`+4 pp`、`122 → 77`、`46 条用例`）；标点用中文全角；**引号一律用「」**，禁止 “” 和 ASCII 直引号。
4. 每节结构：`number-label` + 结论式 `h2`（不是名词短语）→ `case-lede` 给结论 → 证据（表/图/卡）→ `judgment` 写判断。禁止流水账。
5. 篇幅：01+02 合计中文 ≤ 1100 字；03+04+05 合计中文 ≤ 1200 字（整页上限 2400 字）。不注水，重复表述合并。
6. 口径必须写在数字旁边：治理指标写「治理前后对照评测」，覆盖率写「46 条场景用例 · 离线评测」。众筹超 70 万美元是产品整体成绩，不得写成个人成果。
7. 保密：不出现内网 / localhost / 私有仓库地址；公司数据脱敏。
8. 子 Agent 只输出自己被指派的片段文件，最终答复里列出改动/新建的文件绝对路径。

---

## 三、已裁定事实（唯一可用素材，来自 材料/_case-spec.md §4.1 / §4.7）

- Cortex-Agent：可以科技 Loona 桌面机器人的 Agent 运行时，面向办公辅助与陪伴场景，支持语音交互与主动任务执行；基于 ReAct 架构完成任务路由、规划、工具编排与输出门控。
- 工具治理动作为三项：**同类能力聚合 + 业务域路由 + 按需动态召回**，表述为「主导设计」；推动 ToolHub 全量注入 → 按需加载；工具数 **122 → 77**；治理前后对照评测：Planner 单轮输入 Token **≈30% ↓**，端到端任务成功率 **+4 pp**。
- **禁止**写任何工具分组数量分布（图示与正文都不得出现编造的分组计数）；**禁止**写 Token 降 40%、9 项办公能力、9 大核心场景。
- 主动服务：参与设计 **Mental Offload 主动服务体系**，主导**会议、工作汇报**两类主动服务的需求定义、方案设计与上线验收；基于 Bad Case 归因持续迭代；关键事项覆盖率 **60% → 87%**；**46 条场景用例、5 轮 Bad Case 迭代**，口径标注「离线场景用例评测」。
- 办公能力接入：**Gmail、Outlook 邮件／日程等 5 项**办公工具能力的需求定义、功能设计与上线验收；**工具接入 PRD 生成 Skill** 覆盖接口调研、功能设计、核心 Case、异常分支与验收标准；仓库 https://github.com/Zhaozed/Loona-PMdevelopskill （公开）。
- 评审工作台：针对语音、Agent 决策、UI 状态与时序难以在静态原型中完整评审；搭建**可播放的交互工作台**，支持链路动态演示、关键帧讨论/批注、理想链路导出 JSON；**Mock 评审工具，非产品代码**，沉淀为可复用产品设计资产。**禁止**写「支撑 10+ 需求评审」或任何评审次数。
- 归属信息：公司项目 可以科技 KEYi · Loona Cortex-Agent；项目时间 2026.04 — 至今；担任角色 AI 产品经理（实习）；负责范围 工具治理 / 主动服务 / 办公能力接入与验收 / PRD Skill 与评审工作台；协作对象 产品负责人 · 研发；项目状态 能力持续接入中。
- 已有可用素材文件：评审工作台演示视频 `/portfolio/practice/review-workbench-demo.mp4`，封面 `/portfolio/practice/review-workbench.png`（20—30 秒演示，静音循环）。其余（办公场景图/视频、PRD 局部预览、会议简报脱敏截图、代表性迭代记录、评测口径细节）**均无素材，必须写成待补占位**。

---

## 四、可用组件 class 清单（照抄结构，禁止自创）

| 用途 | 结构 |
|---|---|
| 章节 | `<section class="case-section"><div><p class="number-label">02 / TOOLHUB</p><h2>结论式标题</h2></div><div class="case-copy">…</div></section>` |
| 结论句（每节首句） | `<p class="case-lede">…</p>` |
| 我的判断 / 设计判断 | `<div class="judgment"><p class="judgment__label">设计判断</p><p>…</p></div>` |
| 编号卡片网格 | `<div class="tile-grid"><div class="tile"><p class="tile__index">01</p><b>标题</b><p>说明</p></div>…</div>` |
| 做/不做边界 | `<div class="scope"><div class="scope__col scope__col--in"><p class="scope__title">本次做</p><ul><li>…</li></ul></div><div class="scope__col scope__col--out"><p class="scope__title">明确不做</p><ul><li>…</li></ul></div></div>` |
| 链路/流程 | `<div class="flow"><div class="flow__step"><span>STEP 01</span><b>名称</b><small>说明</small></div><div class="flow__arrow">→</div>…</div>`（门禁节点加 `flow__step--gate`） |
| 数据表 | `<table class="data-table"><caption>表 1 · 标题</caption><thead><tr><th>…</th></tr></thead><tbody><tr><td>…</td><td class="num">122 → 77</td></tr></tbody></table>` |
| 三个指标 | `<div class="stat-row"><div class="metric"><strong class="font-mono text-3xl">≈30% ↓</strong><p class="muted text-sm">运行约束 · Planner 单轮输入 Token</p></div>…</div>` |
| 图片 | `<figure class="figure"><img src="/portfolio/…" alt="…" loading="lazy" /><figcaption>图 1 · 说明</figcaption></figure>` |
| 标签行 | `<div class="chip-row"><span class="chip">ToolHub</span>…</div>` |
| 按钮/链接 | `<a class="button-primary" href="…" target="_blank" rel="noopener">查看 Skill ↗</a>`、`<a class="button-ghost" …>`、行内 `<a class="cactus-link" href="…">` |
| 循环视频 | 主线程负责 `LoopVideo` 组件；子 Agent 写 `<!-- SLOT:VIDEO-WORKBENCH -->` |
| 强调 | 正文 `<strong>`；次要说明 `<p class="muted mt-7">…</p>` |
| 章节末尾 CTA | `<div class="case-cta">…按钮…</div>` |

### 折叠块统一模板（PART A 的两处「折叠入口」都用它）

```html
<details class="mt-7 border-t border-dashed border-neutral-300 pt-4 dark:border-neutral-600">
	<summary class="cursor-pointer font-mono text-xs tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">查看评测口径与一个工具聚合示例</summary>
	<div class="mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
		<ol class="list-decimal space-y-2 ps-5">
			<li>…</li>
		</ol>
	</div>
</details>
```

### 待补素材占位统一模板（缺真实材料时使用，不得省略）

```html
<div class="mt-6 border border-dashed border-neutral-300 p-5 dark:border-neutral-600">
	<p class="font-mono text-xs tracking-widest uppercase text-neutral-400">待补素材 / TODO</p>
	<p class="mt-2 text-sm leading-7 text-neutral-500 dark:text-neutral-400">需要……（写清缺什么、由谁提供、补齐后替换本块）</p>
</div>
```

### 图表嵌入槽位（主线程替换，子 Agent 只写注释）

```html
<!-- SLOT:DIAGRAM-TOOLHUB -->   <!-- Archify：ToolHub 治理前后对比 -->
<!-- SLOT:DIAGRAM-ITERATION --> <!-- Archify：主动服务覆盖率评测与 Bad Case 迭代闭环 -->
<!-- SLOT:VIDEO-WORKBENCH -->   <!-- LoopVideo：评审工作台 20—30 秒演示 -->
```
