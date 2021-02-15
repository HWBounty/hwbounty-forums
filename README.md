# HWBounty

Hi GunnHacks judges, check out our backend! https://github.com/HWBounty/hwbounty-backend,
and our site https://hwbounty.help/

### What is HWBounty?
Are you strugging in school right now especially with all the crazy assignments and lack of in-person communication with your friends and teachers? Well look no further, HWBounty has everything you need to make sure you are able to do your very best! With dedicated forums for each subject, you'll be able to put a point "bounty" on your questions, and people looking to grind out some points will be able to help you. Why would anyone want to help? Well first off, our premium points (ppoints) will amount to a cash value, and we will let you redeed you hard work for real cash or a discord nitro reward. As for the normal points, we will be running a monthly bounty leaderboard and award the top users with amazon gift cards and more! Support for schoology.com integration, discord login, and google login coming soon.

### Features that are almost done or coming soon

- Schoology login for both verifying that the person is real and for importing classes for easier searches
- Refering friends for fun rewards!
- User settings and dark mode

### How did we do it?
We spent a lot of time planning our site and drew out what we thought would look best for UI design. Using Material UI, a styling framework made for react based on Google's designs, we were able to make some cool looking components and piece them together to make our entire website. As for the funcitonality of it, we used a state manager called Redux, which allowed us to easily save information from the server about bounties, users, etc. in an easy-to-access format. We would send either POST or GET request from the client, using our custom hashed authentication tokens to identify the user. On the backend side, we used a SQL database hosted on a VM. One of our biggest struggles with this, however, is that an https website (like out own) does not allow calls to http. This was a big problem, and so after trying out free domain name providers one after another for https redirects, we decided to pay money from out own pocket (well John's pockets) and buy a domain that would actually work. It took a while to set up, and we were glad that it didn't take the 18-24 hours it said it would for the domain to work. Back to the SQL database, we were now able to send our POST and GET requests and recieve data, post data, and get login information. After adding all the endpoints that we needed, the site was completely functional!
