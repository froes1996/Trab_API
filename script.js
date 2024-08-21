    async function fetchBankInfo() {
            try {
                const response = await fetch('https://brasilapi.com.br/api/banks/v1/001');
    const data = await response.json();
    document.getElementById('bank-result').textContent = `Banco: ${data.name}, Código: ${data.code}`;
            } catch (error) {
        document.getElementById('bank-result').textContent = 'Erro ao buscar informações do banco.';
            }
        }

    async function fetchCepInfo() {
            try {
                const response = await fetch('https://brasilapi.com.br/api/cep/v1/96211680');
    const data = await response.json();
    document.getElementById('cep-result').textContent = `CEP: ${data.cep}, Cidade: ${data.city}, Estado: ${data.state}`;
            } catch (error) {
        document.getElementById('cep-result').textContent = 'Erro ao buscar informações do CEP.';
            }
        }

    document.getElementById('cnpj-form').addEventListener('submit', async function (event) {
        event.preventDefault();
    const cnpj = document.getElementById('cnpj').value;

    try {
                const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    const data = await response.json();
    document.getElementById('cnpj-result').textContent = `Empresa: ${data.razao_social}, Nome Fantasia: ${data.nome_fantasia}, Status: ${data.status}`;
            } catch (error) {
        document.getElementById('cnpj-result').textContent = 'Erro ao buscar informações do CNPJ.';
            }
        });

    document.getElementById('ddd-form').addEventListener('submit', async function (event) {
        event.preventDefault();
    const ddd = document.getElementById('ddd').value;

    try {
                const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);
    const data = await response.json();
    document.getElementById('ddd-result').textContent = `Estado: ${data.state}, Cidades: ${data.cities.join(', ')}`;
            } catch (error) {
        document.getElementById('ddd-result').textContent = 'Erro ao buscar informações do DDD.';
            }
        });

    fetchBankInfo();
    fetchCepInfo();

function fetchApi(url) {
    return fetch(url).then(response => response.json());
}
const catApi = 'https://catfact.ninja/fact';
const dogApi = 'https://dog.ceo/api/breeds/image/random';
const userApi = 'https://randomuser.me/api/';

document.getElementById('race-btn').addEventListener('click', function () {
    const raceResult = document.getElementById('race-result');
    raceResult.textContent = 'Carregando...';

    Promise.race([
        fetchApi(catApi),
        fetchApi(dogApi),
        fetchApi(userApi)
    ])
        .then(result => {
            raceResult.textContent = `Resultado da primeira API resolvida: ${JSON.stringify(result)}`;
        })
        .catch(error => {
            raceResult.textContent = `Erro na primeira API rejeitada: ${error.message}`;
        });
});

document.getElementById('all-btn').addEventListener('click', function () {
    const allResult = document.getElementById('all-result');
    allResult.textContent = 'Carregando...';

    Promise.all([
        fetchApi(catApi),
        fetchApi(dogApi),
        fetchApi(userApi)
    ])
        .then(results => {
            allResult.textContent = `Resultados das 3 APIs: ${results.map(result => JSON.stringify(result)).join(' | ')}`;
        })
        .catch(error => {
            allResult.textContent = `Erro na última API rejeitada: ${error.message}`;
        });
});