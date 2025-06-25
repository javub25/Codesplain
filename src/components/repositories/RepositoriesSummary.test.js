import {render, screen} from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';
import "@testing-library/jest-dom";

const mockRepository = {
    stargazers_count: 100,
    open_issues: 5,
    forks: 10,
    language: 'JavaScript'
}
const repositoryMockFunction = jest.fn();

const callRepoFunction = () => repositoryMockFunction(mockRepository);

const showRepositorySummary = () => 
{
    render(<RepositoriesSummary repository={mockRepository} />);
}

const getLanguage = () => screen.getByText(/javaScript/i);

const getRepositoryText = (repository) => 
{
    repository.forEach(value => {
        const currentRepo = screen.getByText(value);
        expect(currentRepo).toBeInTheDocument();
    })
}

describe('Repositories Summary Test', () => {
    test('it should render the repository summary', () => {
        showRepositorySummary();
    })

    test('it should call repository function with the properly repository values', () => {
        callRepoFunction();
        expect(repositoryMockFunction).toHaveBeenCalledWith(mockRepository);
    })
    
    test('it should display language attribute in the repository', () => {
        showRepositorySummary();

        const currentLanguage = getLanguage();
        expect(currentLanguage).toBeInTheDocument();
    })
    test('it should display each repository value in the component', () => 
    {
        const repository = Array.from(mockRepository);

        showRepositorySummary();
        getRepositoryText(repository);
    })
});