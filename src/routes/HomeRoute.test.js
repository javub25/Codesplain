import {render, screen, within} from '@testing-library/react';
import HomeRoute from './HomeRoute';
import {MemoryRouter} from 'react-router-dom';
import {createFakeServer} from '../test/server/createFakeServer.js';
const getAPIData = (currentRepoLanguage) => {

    const APIData = {
        items: [
            {
                id: 658928958,
                full_name: `${currentRepoLanguage}_link_one`,
            },
            {
                id: 110876221,
                full_name: `${currentRepoLanguage}_link_two`,
            },
        ]
    }
 
    return {APIData};
}

createFakeServer([
    {
        path: '/api/repositories',
        method: 'get',
        res: (req) => {
            const currentLanguageRepo = req.url.searchParams.get('q').split('language:')[1];

            const {APIData} = getAPIData(currentLanguageRepo);
            return APIData
        }
    }
])


const showHomeRoute = () => 
{
    render(
        <MemoryRouter>
            <HomeRoute />
        </MemoryRouter>
    );
}


const getRepositoryAmount = () => 
{
    const repositories = screen.getAllByTestId(/popular repository/i);
    return {repositories};
}

const getRepoLinks = async(repo) => 
{
    const repositoryLinks = await within(repo).findAllByRole('link');
    return {repositoryLinks}
}

const ensureRepoHasTwoLinks = async (repo) => 
{
    const {repositoryLinks} = await getRepoLinks(repo);
    expect(repositoryLinks).toHaveLength(2);
}

const checkFirstRepoLinkValue = (repoLinks, repoLanguage) =>  
    expect(repoLinks[0]).toHaveAttribute('href', `/repositories/${repoLanguage}_link_one`); 

const checkSecondRepoLinkValue = (repoLinks, repoLanguage) => 
    expect(repoLinks[1]).toHaveAttribute('href', `/repositories/${repoLanguage}_link_two`);

const validateRepoLinksForLanguage = async(repo, repoLanguage) => 
{
    const {repositoryLinks} = await getRepoLinks(repo);
    checkFirstRepoLinkValue(repositoryLinks, repoLanguage);
    checkSecondRepoLinkValue(repositoryLinks, repoLanguage);    
}

const RepoLanguages = ['javascript', 'typescript', 'rust', 'go', 'python', 'java'];
const getLanguageByIndex = (index) => (RepoLanguages[index]);

const checkRepoHasLinks = async(repositories) => {

    for(const [index, repo] of repositories.entries())
    {
       await ensureRepoHasTwoLinks(repo);

       const repoLanguage = getLanguageByIndex(index);

       await validateRepoLinksForLanguage(repo, repoLanguage);
    }
}

const ensureRepoHasSixItems = (repositories) => expect(repositories).toHaveLength(6);

describe('Most Popular Language repositories test cases', () => 
{
    test('It should be rendered 6 popular repositories', () => 
    {
        showHomeRoute();
        const {repositories} = getRepositoryAmount();
        ensureRepoHasSixItems(repositories);
    })

    test('Each repository should has two links with the correct href value', async() => {
        showHomeRoute();
        const {repositories} = getRepositoryAmount();
        await checkRepoHasLinks(repositories);
    })
})