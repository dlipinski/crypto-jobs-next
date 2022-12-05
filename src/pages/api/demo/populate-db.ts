import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser, User } from '../../../models/user'
import { Application, IApplication } from '../../../models/application'
import { IJob, Job } from '../../../models/job'
import dbConnect from '../../../../lib/dbConnect'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect()

	await Application.remove({})
	await Job.remove({})
	await User.remove({})

	const user1: IUser = new User({ address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' })
	const user2: IUser = new User({ address: '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0' })
	const userMe: IUser = new User({ address: '0x3D17B58130a84431ac9115A2aF7756B6774241e5' })

	for (let i = 0; i < 1000; i++) {
		console.log(`PROGRESS: ${i}/${1000}`)
		const job: IJob = new Job({
			budget: getRandomBudget(),
			title: getRandomTitle(),
			description: getRandomDescription(),
			category: getRandomCategory()
		})
		user1.jobs.push(job)
		const applicationsAmount = getRandomInt(0, 40)
		for (let j = 0; j < applicationsAmount; j++) {
			console.log(`PROGRESS: ${i}/${100}, ${j}/${applicationsAmount}`)
			const application: IApplication = new Application({
				estimatedDays: getRandomInt(1, 30),
				description: getRandomDescription(),
				salary: getRandomBudget(),
				job: job._id
			})
			await application.save()
			job.applications.push(application)
			user2.applications.push(application)
		}
		await job.save()
	}

	await user1.save()
	await user2.save()


	res.status(200).json({ message: 'Ok.' })
}
const getRandomInt = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min)
}

const getRandomBudget = () => getRandomInt(300, 30_000)

const getRandomCategory = () => categories[ getRandomInt(0, categories.length-1) ]

const getRandomTitle = () => titles[ getRandomInt(0, titles.length-1) ]
const getRandomDescription = () => descriptions[ getRandomInt(0, descriptions.length-1) ]

const categories = [ 'Programming and IT', 'Websites and online shops', 'Multimedia and photo', 'Graphics and design', 'Office works', 'Text and translations' ]

const titles = [ 'Redirect sms to api with a simple android application', 'Texts for English-language site', 'We will order graphic design and coding for prestashop store', 'Create an external warehouse by transferring data from the baselinker to the system (warehouse).', 'Fiscal module - printing receipts through the browser', 'Creating a commercial offer for German companies', 'We are looking for a translator from ENGLISH into POLISH for permanent cooperation.', 'I need a short animated intro with voiceover, which I will provide. I will provide all the details of the character\'s appearance and the script. The material should be about 20-30 seconds long', 'Making changes to the finished menu card design' ]


const descriptions = [ `
Intro>

A girl is sitting and typing on a laptop, facing the viewer. A pile can be seen next to her with steam hovering over it. The character suddenly glances above the screen and notices the viewer. She closes the laptop and approaches the viewer. He greets and invites to the blog. A small gesture. Conclusion.

I am open to modifications.
`, `
The order involves making the submitted changes to the menu design, adding new tab items, reducing fonts and adding new categories while maintaining the current layout and layout of the design.
`, `
We are looking for a translator from ENGLISH to POLISH to translate short stories/life stories for FIXED cooperation. C1+ level and stylistic creativity in POLISH will be a plus. More attention is needed to make it sound good (and logical) in Polish. ( Eventually, the material will be read )

Please indicate the rate per 1000 WORDS, and how many such texts on average you will be able to translate WEEKLY.

We will reply to selected submissions.
`, `
Good day,

The order is for two types of products: nail polish and plastic bottle with liquid.

Nail polish: white bottle + different colors of the cap (white, color, glitter) + color names on the drug. Different lettering on the front of the bottle. The order is for an open file (Adobe Illustrator) due to new colors coming out. Quantity: 60-70

Plastic bottle: white bottle, capacity 100 ml. Also open file.

Sample varnishes can be found by typing "hybrid varnish" into the search engine. We want to achieve an effect similar to varnishes from popular brands (shadows, light). The best would be a reproduction of Claresa brand varnish.

The announcement is not about label design, we have labels ready.

A portfolio with similar orders is welcome.

With successful cooperation, new orders are possible.`, `
- logo showing prestige and modernity - will be placed on business clothing, some yachts and standard in printed materials and electronic versions - deadline 7-8 days - company website www.northman.pl
`, `
DNS configuration on a dedicated server with DirectAdmin

` ]
