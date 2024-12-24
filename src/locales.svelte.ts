import { language } from './store.svelte';

let locales = $derived({
	noResults() {
		return {
			en: 'Nothing was Found',
			ka: 'პროდუქცია ვერ მოიძებნა'
		}[language.value];
	},
	about() {
		return {
			en: 'About us',
			ka: 'ჩვენს შესახებ'
		}[language.value];
	},
	about_content() {
		return {
			en: `Our journey started with a clear and ambitious vision: 
			to redefine packaging solutions and empower businesses to grow 
			with ease and confidence. At Leader Pack, we believe 
			that effective packaging is more than just a container—it’s a powerful tool 
			for brand representation and protection.Driven by a commitment to quality and innovation, 
			we provide a range of customizable packaging options tailored to the 
			unique needs of our clients. Whether you're seeking durability or aesthetic appeal, 
			our solutions are crafted to enhance your products and support your brand’s growth.`,
			ka: `ჩვენი საქმიანობა დაიწყო მკაფიო და ამბიციური ხედვით: ჩვენ გვსურდა პოზიტიური ცვლილებები
			შეგვეტანა შესაფუთი მასალების ინდუსტრიაში და დავხმარებოდით ბიზნესებს ეფექტურად ზრდაში. ჩვენ,
			ლიდერ პაკის გუნდს გვჯერა, რომ შეფუთვა მხოლოდ ყუთი ან კონტეინერი არ არის - ეს არის ძლიერი
			ინსტრუმენტი, რომელიც ეხმარება ბრენდებს მათი პროდუქტის პრეზენტაციაში და ბაზარზე თავდაჯერებულად
			პოზიციონირებაში. ჩვენ ინოვაციებისა და ხარისხის ერთგულნი ვართ და ყოველთვის ვიქნებით.
			შესაბამისად, გთავაზობთ ეკოლოგიურად სუფთა შესაფუთ მასალებს, რომლებიც თქვენს საჭიროებებზე არის
			მორგებული. იქნება ეს შეფუთვის გამძლეობა თუ ვიზუალური მხარე, ჩვენი პროდუქცია შექმნილია
			იმისთვის, რომ თქვენს ბრენდს დაეხმაროს ზრდაში.`
		}[language.value];
	},
	contact() {
		return { en: 'Contact Us', ka: 'კონტაქტი' }[language.value];
	},
	contactToOrder() {
		return { en: 'Contact us to order', ka: 'შეკვეთისთვის დაგვიკავშირდით' }[language.value];
	},
	blog() {
		return { en: 'Blog', ka: 'ბლოგი' }[language.value];
	},
	products() {
		return { en: 'Products', ka: 'პროდუქცია' }[language.value];
	},
	categories() {
		return { en: 'Categories', ka: 'კატეგორიები' }[language.value];
	},
	OurCustomers() {
		return { en: 'Our Customers', ka: 'ჩვენი მომხმარებლები' }[language.value];
	},
	search() {
		return { en: 'Search', ka: 'ძებნა' }[language.value];
	},
	why() {
		return { en: 'Why Leader Pack?', ka: 'რატომ ლიდერ პაკი?' }[language.value];
	},
	reason() {
		return {
			en: 'We deliver tailored packaging solutions that exceed expectations. With a focus on quality and visual excellence, <br> we create packaging that reflects your brand and leaves a lasting impression.',
			ka: 'ლიდერ პაკის გუნდი ყოველთვის ცდილობს მოგაწოდოთ შესაფუთი მასალები, რომლებიც აღემატება მოლოდინებს.<br> ჩვენ დიდ ყურადღებას ვაქცევთ პროდუქციის ხარისხსა და ვიზუალს, რათა თქვენმა ბრენდმა დატოვოს დაუვიწყარი შთაბეჭდილება.'
		}[language.value];
	},
	highquality() {
		return {
			en: 'High Quality',
			ka: 'მაღალი ხარისხი'
		}[language.value];
	},
	highqualityExtra() {
		return {
			en: 'We use only premium materials to ensure your packaging not only stands out but also protects and showcases your products beautifully.',
			ka: 'ჩვენ ვიყენებთ პრემიუმ ხარისხის მასალებს, რათა თქვენი პროდუქცია იყოს უსაფრთხოდ შენახული და ვიზუალურად გამორჩეული.'
		}[language.value];
	},
	fastDistribution() {
		return {
			en: 'Fast Distribution',
			ka: 'სწრაფი მიწოდება'
		}[language.value];
	},
	fastDistributionExtra() {
		return {
			en: 'We ensure fast, reliable delivery so you get your packaging supplies on time, every time. Our efficient logistics keep your business running smoothly.',
			ka: 'ჩვენ ვუზრუნველყოფთ სწრაფ და საიმედო დისტრიბუციის სერვისს, რათა თქვენმა ბიზნესმა შეუფერხებლად იმუშაოს.'
		}[language.value];
	},
	customization() {
		return {
			en: 'Customization',
			ka: 'კუსტომიზაცია'
		}[language.value];
	},
	customizationExtra() {
		return {
			en: 'We offer a wide variety of customization options to ensure your packaging matches your brand perfectly. From size and shape to color and design, Leader Pack has you covered.',
			ka: 'ჩვენ გთავაზაობთ პროდუქციის ბრენდირების შესაძლებლობას, რათა გახადოთ თქვენი ბრენდი გამორჩეული.'
		}[language.value];
	},
	rights() {
		return {
			en: '© 2024 Leader Pack. All Rights Reserved',
			ka: '© 2024 Leader Pack. ყველა უფლება დაცულია'
		}[language.value];
	},
	deserve() {
		return {
			en: 'Your Product Deserves <br> Leader Pack',
			ka: 'თქვენი პროდუქცია იმსახურებს<br>ლიდერ პაკს'
		}[language.value];
	},
	perfect() {
		return {
			en: 'Your Product <br> Perfectly Packaged',
			ka: 'თქვენი პროდუქტი <br> იდეალურად შეფუთული'
		}[language.value];
	},
	getStarted() {
		return {
			en: 'Get Started',
			ka: 'დაწყება'
		}[language.value];
	},
	relatedProducts() {
		return {
			en: 'Related Products',
			ka: 'მსგავსი პროდუქცია'
		}[language.value];
	},
	branded() {
		return {
			en: 'Branded',
			ka: 'დაბრენდილი'
		}[language.value];
	},
	unbranded() {
		return {
			en: 'Unbranded',
			ka: 'დაუბრენდავი'
		}[language.value];
	},
	placeOrder() {
		return {
			en: 'Place Order',
			ka: 'განათავსეთ შეკვეთა'
		}[language.value];
	},

	faqs() {
		return {
			en: [
				{
					question: 'Can I customize the packaging with my own design or logo?',
					answer:
						'Yes! We provide full customization options for some of our packaging products. You can personalize the size, shape, color, and design to match your brand identity.	Yes! We offer customization options for some of our products. You can personalize size, shape, color, and design to align with your brand.'
				},
				{
					question: 'How long does it take to produce customized products?',
					answer:
						'Production times vary depending on the product and customization requirements. However, our typical turnaround time for custom orders is 2-3 weeks. We always strive to meet your deadlines and keep you informed throughout the process'
				},
				{
					question: 'Do you only produce customized products?',
					answer:
						'No, we also offer a range of standard, pre-made products in stock that you can choose from. Explore our products section to find out more.'
				},
				{
					question: 'How do I place an order?',
					answer:
						'You can get in touch with us via email or phone to discuss your specific packaging needs. We’ll guide you through the process and provide a quote Email:<br> contact@leaderpack.ge <br> Phone: +995510002228'
				}
			],
			ka: [
				{
					question: 'შემიძლია პროდუქციაზე ჩემი დიზიანის და ლოგოს მორგება?',
					answer:
						'დიახ! ჩვენ გთავაზობთ პერსონალური ბრენდირების შესაძლებლობას რიგი შესაფუთი მასალებისათვის. შეარჩიეთ თქვენთვის სასურველი ზომა, ფორმა, ფერი და დიზაინი, რომელიც ემთხვევა თქვენი ბრენდის იდენტობას.'
				},
				{
					question: 'რა დრო გჭირდებათ პროდუქციის ბრენდირებისათვის?',
					answer:
						'წარმოების ვადა დამოკიდებულია პროდუქციის ტიპზე, თუმცა საშუალოდ ბრენდირებული პროდუქციის დამზადებას 2-3 კვირა ესაჭიროება.'
				},
				{
					question: 'თქვენ მხოლოდ პერსონალიზირებულ პროდუქტს აწარმოებთ?',
					answer:
						'არა, ჩვენ ასევე მარაგში გვაქვს სტანდარტულ, წინასწარ დამზადებულ პროდუქცია, რომელიც შეგიძლიათ შეიძინოთ. შეამოწმეთ პროდუქციის განყოფილება დეტალური ინფორმაციის სანახავად.'
				},
				{
					question: 'როგორ განვათავსო შეკვეთა?',
					answer:
						' შეკვეთის გასაფორმებლად და ნებისმიერი შეკითხვის დასაზუსტებლად შეგიძლიათ დაგვიკავშირდეთ ელექტრონული ფოსტით ან ტელეფონით:<br> Email: contact@leaderpack.ge  <br> Phone: +995510002228'
				}
			]
		}[language.value];
	}
});

export default locales;
