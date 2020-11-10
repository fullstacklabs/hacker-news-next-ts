import Comment from "../../components/Comment"

const by = "Test Person"

const time = 1605020470

const text =
	'Greetings, folks: as we know, headlines don&#x27;t tell the full story, and no, spoiler alert, Go alone did not save HealthCare.gov. A lot of people pulling together and working very hard over many months did. There are very many stories about the rescue. This is but one part about how indeed, a modest but important service written in Go, yes, did help, a lot.<p>It is worth noting that, 7 years later, almost all of HealthCare.gov has been rebuilt, and substantial parts of it are in Go. This is in part what the company I co-founded after the rescue has been up to. (If this kind of thing -- building modern, reliable digital infrastructure for government -- seems appealing to you, [we are hiring][1].) This is a pretty interesting story in its own right.<p>[1]: <a href="https:&#x2F;&#x2F;adhoc.team&#x2F;join&#x2F;" rel="nofollow">https:&#x2F;&#x2F;adhoc.team&#x2F;join&#x2F;</a>'

const CommentPage: React.FC = () => (
	<Comment
		by={by}
		time={time}
		text={text}
		expandToggleClick={() => null}
		isExpanded
		descendants={5}
	/>
)

export default CommentPage