# NearGreen
## Where finding healthy food, is a few steps away.
---
### Thank you for your interest in this project. We always are looking for contributions so please feel free to submit pull requests and create issues.
---

### Developer Notes:
- The Directory Structure and Root Files
    - app -  *all of the front-end assets (CSS, JavaScripts, Images, and 3rd party libraries)*
        - static
            - js - *all of our application specific JavaScript files*
    - .bowerrc - *a Bower customization file... more on this later*
    - .gitignore - *a list of files and directories for GitHub to ignore when we commit code*
    - bower.json - *a metadata file for Bower which contains some information about this project and the libraries Bower has installed for us*
- So what's Bower?
    - Bower is a developer tool that installs and manages front-end, 3rd party libraries
    - It alleviates having to go directly to a site like jQuery.com, downloading the zipped or tarballed source files, and then extracting those files into your project.
- Setup and leveraging Bower for NearGreen
    - All you need to do, once you fork this repository is
        - Make sure you are in the root of your project folder - *../[your_github_username]/neargreen*
        - Type the following line into the terminal: *bower install*
            - This will install jQuery, jQuery-UI, and Bootstrap into *../[github_username]/neargreen/app/static/vendor*
                - The directory path comes from the .bowerrc file I mentioned early.
                    - Notice the JavaScript Object in that file with the property "directory". This is where the aforementioned directory comes from.
    - This only needs to be done the first time you fork this GitHub repository.
- Ummm, so what is *forking*? What about a *pull request*?
    - Forking is taking a base of hosted source code and copying it, to add features, enhancements, and bug fixes.
    - A pull request (often abbreviated as PR) is the mechanism we use in version controlled software, to ask for something we've changed to be added to the main repository.
    - This [article]([http://www.codenewbie.org/blogs/how-to-make-a-pull-request]) explains how to fork a repository and create a PR.



