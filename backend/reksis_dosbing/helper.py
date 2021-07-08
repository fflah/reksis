import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
from nltk.tokenize import word_tokenize
from sklearn.metrics.pairwise import cosine_similarity
from jcopml.utils import load_model
import nltk
import ast
from .models import Dosen
nltk.download('punkt', 'reksis_dosbing/nltk_data')

dosen = [
    'Heru Supriyono, S.T., M.Sc., PhD',
    'Dr. Endah Sudarmilah, S.T., M.Eng',
    'Azizah Fatmawati, S.T., M.Cs',
    'Nurgiyatna, S.T., M.Sc., Ph.D',
    'Aris Rakhmadi, S.T., M.Eng',
    'Dedi Gunawan, S.T., M.Sc., Ph.D',
    'Prof. Dr. Budi Murtiyasa, M.Kom',
    'Husni Thamrin, S.T., M.T., Ph.D',
    'Dr., Ir. Bana Handaga, M.T',
    'Fatah Yasin Al Irsyadi, S.T., M.T',
    'Devi Afriyantari Puspa Putri, S.Kom., M.Sc',
    'Dimas Aryo Anggoro, S.Kom., M.Sc',
    'Maryam, S.Kom., M.Eng',
    'Fajar Suryawan, Ph.D',
    'Jumadi, Ph.D',
    'Dr. Agus Ulinuha, M.T',
    'Munajat Tri Nugroho, ST, MT, Ph.D',
    'Yusuf Sulistyo Nugroho, S.T., M.Eng'
]
def reksis_dosbing(input=None):
    if input != None:
        df = pd.read_csv('reksis_dosbing/data/dataset_clear.csv')
        df_bank = pd.read_json('reksis_dosbing/data/dataset_bank.json')
        df.fillna(value='', inplace=True)
        sw_indo = load_model('reksis_dosbing/data/sw_indo.pkl')
        tfidf_vectorizer = TfidfVectorizer(ngram_range=(1, 2), tokenizer=word_tokenize, stop_words=sw_indo)
        list_of_result = []
        for nama_dosen in dosen:
            tfidf_matrix_train = tfidf_vectorizer.fit_transform(df[nama_dosen])
            tfidf_matrix_test = tfidf_vectorizer.transform([input])

            sim = cosine_similarity(tfidf_matrix_test, tfidf_matrix_train)
            arg_sim = sim.argsort()
            list_of_sim = sim.tolist()
            list_of_sim[0].sort()
            foto_dosen = Dosen.objects.filter(nama=nama_dosen).values('foto').first()
            data = {          
                'dosen':nama_dosen,      
                'foto': foto_dosen,
                'value_similarity':list_of_sim[0][-1],
                'judul': df_bank[nama_dosen][int(arg_sim[0][-1])]['judul'],
                'abstrak': df_bank[nama_dosen][int(arg_sim[0][-1])]['abstrak']   
            }
            list_of_result.append(data)
        
        return sorted(list_of_result, key = lambda i: i['value_similarity'], reverse=True)[:5]
    else:
        return print('input kosong')

