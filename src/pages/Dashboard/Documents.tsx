import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Award, 
  BookOpen, 
  Calendar,
  Eye,
  Search,
  Filter,
  ExternalLink
} from 'lucide-react';
import Layout from '../../components/Layout/Layout';

interface Document {
  id: string;
  title: string;
  type: 'confirmation' | 'certificate' | 'study_guide' | 'other';
  description: string;
  uploadDate: string;
  size: string;
  downloadUrl: string;
  status: 'available' | 'pending' | 'processing';
}

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const documents: Document[] = [
    {
      id: '1',
      title: 'Registration Confirmation Letter',
      type: 'confirmation',
      description: 'Official confirmation of your school\'s registration for SchoolMUN 2024',
      uploadDate: '2024-02-15',
      size: '245 KB',
      downloadUrl: '#',
      status: 'available'
    },
    {
      id: '2',
      title: 'UNSC Study Guide',
      type: 'study_guide',
      description: 'Comprehensive study guide for UN Security Council delegates',
      uploadDate: '2024-02-10',
      size: '3.2 MB',
      downloadUrl: '#',
      status: 'available'
    },
    {
      id: '3',
      title: 'General Assembly Study Guide',
      type: 'study_guide',
      description: 'Study materials for General Assembly committee',
      uploadDate: '2024-02-10',
      size: '2.8 MB',
      downloadUrl: '#',
      status: 'available'
    },
    {
      id: '4',
      title: 'Participation Certificate',
      type: 'certificate',
      description: 'Certificate of participation (available after conference)',
      uploadDate: '2024-06-05',
      size: 'TBD',
      downloadUrl: '#',
      status: 'pending'
    },
    {
      id: '5',
      title: 'Conference Schedule',
      type: 'other',
      description: 'Detailed schedule of all conference events and sessions',
      uploadDate: '2024-02-20',
      size: '156 KB',
      downloadUrl: '#',
      status: 'available'
    },
    {
      id: '6',
      title: 'Award Certificates',
      type: 'certificate',
      description: 'Individual award certificates for outstanding delegates',
      uploadDate: '2024-06-05',
      size: 'TBD',
      downloadUrl: '#',
      status: 'pending'
    }
  ];

  const documentTypes = [
    { value: '', label: 'All Documents' },
    { value: 'confirmation', label: 'Confirmations' },
    { value: 'study_guide', label: 'Study Guides' },
    { value: 'certificate', label: 'Certificates' },
    { value: 'other', label: 'Other' }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'confirmation': return FileText;
      case 'certificate': return Award;
      case 'study_guide': return BookOpen;
      default: return FileText;
    }
  };

  const getDocumentColor = (type: string) => {
    switch (type) {
      case 'confirmation': return 'bg-blue-100 text-blue-600';
      case 'certificate': return 'bg-accent-100 text-primary-900';
      case 'study_guide': return 'bg-green-100 text-green-600';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-accent-100 text-primary-900';
      case 'processing': return 'bg-blue-100 text-blue-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  const stats = [
    {
      icon: FileText,
      label: 'Total Documents',
      value: documents.length.toString(),
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Download,
      label: 'Available Downloads',
      value: documents.filter(d => d.status === 'available').length.toString(),
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Calendar,
      label: 'Pending',
      value: documents.filter(d => d.status === 'pending').length.toString(),
      color: 'bg-accent-100 text-primary-900'
    },
    {
      icon: Award,
      label: 'Certificates',
      value: documents.filter(d => d.type === 'certificate').length.toString(),
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <Layout showAnnouncement={false}>
      <div className="py-8 bg-neutral-50 min-h-screen">
        <div className="container-max section-padding">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-primary-900 mb-2">Documents & Downloads</h1>
            <p className="text-neutral-600">
              Access your registration confirmations, study guides, certificates, and other important documents
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-primary-900">{stat.value}</div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-neutral-600" />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="input-field min-w-[150px]"
                  >
                    {documentTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="text-sm text-neutral-600">
                  {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>
          </motion.div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDocuments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="lg:col-span-2 card text-center py-12"
              >
                <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-600 mb-2">No documents found</h3>
                <p className="text-neutral-500">
                  Try adjusting your search terms or filters
                </p>
              </motion.div>
            ) : (
              filteredDocuments.map((document, index) => {
                const IconComponent = getDocumentIcon(document.type);
                return (
                  <motion.div
                    key={document.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getDocumentColor(document.type)}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary-900">{document.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(document.status)}`}>
                              {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                            </span>
                            <span className="text-xs text-neutral-500">
                              {document.type.replace('_', ' ').charAt(0).toUpperCase() + document.type.replace('_', ' ').slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                      {document.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span>Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</span>
                        <span>Size: {document.size}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {document.status === 'available' ? (
                        <>
                          <a
                            href={document.downloadUrl}
                            className="btn-primary flex-1 inline-flex items-center justify-center space-x-2 text-sm"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </a>
                          <button className="btn-secondary inline-flex items-center justify-center space-x-2 text-sm px-4">
                            <Eye className="w-4 h-4" />
                            <span>Preview</span>
                          </button>
                        </>
                      ) : document.status === 'pending' ? (
                        <div className="flex-1 bg-neutral-100 text-neutral-600 px-4 py-2 rounded-lg text-sm text-center">
                          Available after conference
                        </div>
                      ) : (
                        <div className="flex-1 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm text-center">
                          Processing...
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mt-8 bg-primary-50 border-primary-200"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Need Help with Documents?</h3>
                <p className="text-primary-700 text-sm mb-4">
                  If you're having trouble accessing or downloading any documents, or if you notice 
                  any missing files, please don't hesitate to contact our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/contact"
                    className="btn-primary inline-flex items-center justify-center space-x-2 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Contact Support</span>
                  </a>
                  <a
                    href="/faq"
                    className="btn-secondary inline-flex items-center justify-center space-x-2 text-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>View FAQ</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;