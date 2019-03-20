---
layout: wiki
directory: fundamentals
filename: code-review.md
title: Fundamentals > Code Review
redirect_from:
  - "/wikis/fundamentals/"
---
## Code Review
### Purpose
The goal of code review is to ensure quality work because debugging is more expensive than developing.

As I said, it can sometimes be daunting to review someone else's code, especially if that person has more experience, expertise, or seniority than you do. But don't be afraid! When everyone participates in code reviewing, everyone wins! Here are a couple of helpful things to remember.

**First** of all, everyone makes mistakes, and we know it! When a coder knows he or she will be code reviewed, it's like a safety net: they can more easily relax and code, knowing that another set of eyes will be reading this code before it's considered "done".

**Second**, everyone learns from a code review. The author gains additional insight on how to improve their code; the reviewer can learn new techniques and ideas from the code they're reviewing; the bystanders get the benefits of both.

In short, don't be afraid to contribute feedback! Code reviewing can be one of the most valuable contributions you can make to a project.

### Author's Responsibilities
- Do not submit a huge pull request for review. Break it down to small pull requests.
- Include a link to the task and include the purpose of the change.
- Write in-line comments to explain the algorithm.
- Format your codes for readability.
- Post screenshots if you are working on a GUI.
- Submit a draft or `WIP` pull request to get feedback right away.
- Check the CI/CD for build and test failures.
- Support your argument with proper resources. Official documentations work great.
- Lint your codes.
- Document your codes within the file or a wiki.

### Reviewers' Responsibilities
- Review the task to verify the purpose of the change.
- Check the CI/CD for failures.
- Ask for screenshots if needed.
- Review the functionality. Verify the input against the output. Check the unit test for missing cases. Do we need synchronization?
- Review for maintainability. Can we easily maintain and scale the codes?
- Can we optimize it?
- If asking for changes, include a reason for the change and possibly provide documentations or examples. Feel free to even suggest or write the change needed.
- Follow up on reviews to resolve.
- Check for lint errors.
- Check for missing documentation in the codes and wiki.

### Additional Review for frontend
1. Fetch the branch.
2. Build the frontend locally.
3. Run the server.
4. Try and experience the added/modified/deleted GUI.
5. Ensure the component works as intended.
6. Check the browser's console for errors.
7. Check for styling issues e.g. resizing the window, focusing using `TAB` key.
8. Test for other browsers like Firefox, Chrome, and Safari.
9. Try setting a slow internet to test the page. (Can be set within the console)
10. Ensure `CHANGELOG.md` is updated.
